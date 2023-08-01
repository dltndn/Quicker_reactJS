// SPDX-License-Identifier: MIT
// File: @openzeppelin/contracts/utils/introspection/IERC165.sol


// OpenZeppelin Contracts v4.4.1 (utils/introspection/IERC165.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC165 standard, as defined in the
 * https://eips.ethereum.org/EIPS/eip-165[EIP].
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others ({ERC165Checker}).
 *
 * For an implementation, see {ERC165}.
 */
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

// File: @openzeppelin/contracts/utils/introspection/ERC165.sol


// OpenZeppelin Contracts v4.4.1 (utils/introspection/ERC165.sol)

pragma solidity ^0.8.0;


/**
 * @dev Implementation of the {IERC165} interface.
 *
 * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check
 * for the additional interface id that will be supported. For example:
 *
 * ```solidity
 * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
 *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);
 * }
 * ```
 *
 * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.
 */
abstract contract ERC165 is IERC165 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}

// File: @openzeppelin/contracts/utils/math/Math.sol


// OpenZeppelin Contracts (last updated v4.8.0) (utils/math/Math.sol)

pragma solidity ^0.8.0;

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library Math {
    enum Rounding {
        Down, // Toward negative infinity
        Up, // Toward infinity
        Zero // Toward zero
    }

    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow.
        return (a & b) + (a ^ b) / 2;
    }

    /**
     * @dev Returns the ceiling of the division of two numbers.
     *
     * This differs from standard division with `/` in that it rounds up instead
     * of rounding down.
     */
    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b - 1) / b can overflow on addition, so we distribute.
        return a == 0 ? 0 : (a - 1) / b + 1;
    }

    /**
     * @notice Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or denominator == 0
     * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)
     * with further edits by Uniswap Labs also under MIT license.
     */
    function mulDiv(
        uint256 x,
        uint256 y,
        uint256 denominator
    ) internal pure returns (uint256 result) {
        unchecked {
            // 512-bit multiply [prod1 prod0] = x * y. Compute the product mod 2^256 and mod 2^256 - 1, then use
            // use the Chinese Remainder Theorem to reconstruct the 512 bit result. The result is stored in two 256
            // variables such that product = prod1 * 2^256 + prod0.
            uint256 prod0; // Least significant 256 bits of the product
            uint256 prod1; // Most significant 256 bits of the product
            assembly {
                let mm := mulmod(x, y, not(0))
                prod0 := mul(x, y)
                prod1 := sub(sub(mm, prod0), lt(mm, prod0))
            }

            // Handle non-overflow cases, 256 by 256 division.
            if (prod1 == 0) {
                return prod0 / denominator;
            }

            // Make sure the result is less than 2^256. Also prevents denominator == 0.
            require(denominator > prod1);

            ///////////////////////////////////////////////
            // 512 by 256 division.
            ///////////////////////////////////////////////

            // Make division exact by subtracting the remainder from [prod1 prod0].
            uint256 remainder;
            assembly {
                // Compute remainder using mulmod.
                remainder := mulmod(x, y, denominator)

                // Subtract 256 bit number from 512 bit number.
                prod1 := sub(prod1, gt(remainder, prod0))
                prod0 := sub(prod0, remainder)
            }

            // Factor powers of two out of denominator and compute largest power of two divisor of denominator. Always >= 1.
            // See https://cs.stackexchange.com/q/138556/92363.

            // Does not overflow because the denominator cannot be zero at this stage in the function.
            uint256 twos = denominator & (~denominator + 1);
            assembly {
                // Divide denominator by twos.
                denominator := div(denominator, twos)

                // Divide [prod1 prod0] by twos.
                prod0 := div(prod0, twos)

                // Flip twos such that it is 2^256 / twos. If twos is zero, then it becomes one.
                twos := add(div(sub(0, twos), twos), 1)
            }

            // Shift in bits from prod1 into prod0.
            prod0 |= prod1 * twos;

            // Invert denominator mod 2^256. Now that denominator is an odd number, it has an inverse modulo 2^256 such
            // that denominator * inv = 1 mod 2^256. Compute the inverse by starting with a seed that is correct for
            // four bits. That is, denominator * inv = 1 mod 2^4.
            uint256 inverse = (3 * denominator) ^ 2;

            // Use the Newton-Raphson iteration to improve the precision. Thanks to Hensel's lifting lemma, this also works
            // in modular arithmetic, doubling the correct bits in each step.
            inverse *= 2 - denominator * inverse; // inverse mod 2^8
            inverse *= 2 - denominator * inverse; // inverse mod 2^16
            inverse *= 2 - denominator * inverse; // inverse mod 2^32
            inverse *= 2 - denominator * inverse; // inverse mod 2^64
            inverse *= 2 - denominator * inverse; // inverse mod 2^128
            inverse *= 2 - denominator * inverse; // inverse mod 2^256

            // Because the division is now exact we can divide by multiplying with the modular inverse of denominator.
            // This will give us the correct result modulo 2^256. Since the preconditions guarantee that the outcome is
            // less than 2^256, this is the final result. We don't need to compute the high bits of the result and prod1
            // is no longer required.
            result = prod0 * inverse;
            return result;
        }
    }

    /**
     * @notice Calculates x * y / denominator with full precision, following the selected rounding direction.
     */
    function mulDiv(
        uint256 x,
        uint256 y,
        uint256 denominator,
        Rounding rounding
    ) internal pure returns (uint256) {
        uint256 result = mulDiv(x, y, denominator);
        if (rounding == Rounding.Up && mulmod(x, y, denominator) > 0) {
            result += 1;
        }
        return result;
    }

    /**
     * @dev Returns the square root of a number. If the number is not a perfect square, the value is rounded down.
     *
     * Inspired by Henry S. Warren, Jr.'s "Hacker's Delight" (Chapter 11).
     */
    function sqrt(uint256 a) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        // For our first guess, we get the biggest power of 2 which is smaller than the square root of the target.
        //
        // We know that the "msb" (most significant bit) of our target number `a` is a power of 2 such that we have
        // `msb(a) <= a < 2*msb(a)`. This value can be written `msb(a)=2**k` with `k=log2(a)`.
        //
        // This can be rewritten `2**log2(a) <= a < 2**(log2(a) + 1)`
        // → `sqrt(2**k) <= sqrt(a) < sqrt(2**(k+1))`
        // → `2**(k/2) <= sqrt(a) < 2**((k+1)/2) <= 2**(k/2 + 1)`
        //
        // Consequently, `2**(log2(a) / 2)` is a good first approximation of `sqrt(a)` with at least 1 correct bit.
        uint256 result = 1 << (log2(a) >> 1);

        // At this point `result` is an estimation with one bit of precision. We know the true value is a uint128,
        // since it is the square root of a uint256. Newton's method converges quadratically (precision doubles at
        // every iteration). We thus need at most 7 iteration to turn our partial result with one bit of precision
        // into the expected uint128 result.
        unchecked {
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            return min(result, a / result);
        }
    }

    /**
     * @notice Calculates sqrt(a), following the selected rounding direction.
     */
    function sqrt(uint256 a, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = sqrt(a);
            return result + (rounding == Rounding.Up && result * result < a ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 2, rounded down, of a positive value.
     * Returns 0 if given 0.
     */
    function log2(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >> 128 > 0) {
                value >>= 128;
                result += 128;
            }
            if (value >> 64 > 0) {
                value >>= 64;
                result += 64;
            }
            if (value >> 32 > 0) {
                value >>= 32;
                result += 32;
            }
            if (value >> 16 > 0) {
                value >>= 16;
                result += 16;
            }
            if (value >> 8 > 0) {
                value >>= 8;
                result += 8;
            }
            if (value >> 4 > 0) {
                value >>= 4;
                result += 4;
            }
            if (value >> 2 > 0) {
                value >>= 2;
                result += 2;
            }
            if (value >> 1 > 0) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 2, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log2(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log2(value);
            return result + (rounding == Rounding.Up && 1 << result < value ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 10, rounded down, of a positive value.
     * Returns 0 if given 0.
     */
    function log10(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >= 10**64) {
                value /= 10**64;
                result += 64;
            }
            if (value >= 10**32) {
                value /= 10**32;
                result += 32;
            }
            if (value >= 10**16) {
                value /= 10**16;
                result += 16;
            }
            if (value >= 10**8) {
                value /= 10**8;
                result += 8;
            }
            if (value >= 10**4) {
                value /= 10**4;
                result += 4;
            }
            if (value >= 10**2) {
                value /= 10**2;
                result += 2;
            }
            if (value >= 10**1) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 10, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log10(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log10(value);
            return result + (rounding == Rounding.Up && 10**result < value ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 256, rounded down, of a positive value.
     * Returns 0 if given 0.
     *
     * Adding one to the result gives the number of pairs of hex symbols needed to represent `value` as a hex string.
     */
    function log256(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >> 128 > 0) {
                value >>= 128;
                result += 16;
            }
            if (value >> 64 > 0) {
                value >>= 64;
                result += 8;
            }
            if (value >> 32 > 0) {
                value >>= 32;
                result += 4;
            }
            if (value >> 16 > 0) {
                value >>= 16;
                result += 2;
            }
            if (value >> 8 > 0) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 10, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log256(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log256(value);
            return result + (rounding == Rounding.Up && 1 << (result * 8) < value ? 1 : 0);
        }
    }
}

// File: @openzeppelin/contracts/utils/Strings.sol


// OpenZeppelin Contracts (last updated v4.8.0) (utils/Strings.sol)

pragma solidity ^0.8.0;


/**
 * @dev String operations.
 */
library Strings {
    bytes16 private constant _SYMBOLS = "0123456789abcdef";
    uint8 private constant _ADDRESS_LENGTH = 20;

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        unchecked {
            uint256 length = Math.log10(value) + 1;
            string memory buffer = new string(length);
            uint256 ptr;
            /// @solidity memory-safe-assembly
            assembly {
                ptr := add(buffer, add(32, length))
            }
            while (true) {
                ptr--;
                /// @solidity memory-safe-assembly
                assembly {
                    mstore8(ptr, byte(mod(value, 10), _SYMBOLS))
                }
                value /= 10;
                if (value == 0) break;
            }
            return buffer;
        }
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        unchecked {
            return toHexString(value, Math.log256(value) + 1);
        }
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }

    /**
     * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.
     */
    function toHexString(address addr) internal pure returns (string memory) {
        return toHexString(uint256(uint160(addr)), _ADDRESS_LENGTH);
    }
}

// File: @openzeppelin/contracts/access/IAccessControl.sol


// OpenZeppelin Contracts v4.4.1 (access/IAccessControl.sol)

pragma solidity ^0.8.0;

/**
 * @dev External interface of AccessControl declared to support ERC165 detection.
 */
interface IAccessControl {
    /**
     * @dev Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole`
     *
     * `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite
     * {RoleAdminChanged} not being emitted signaling this.
     *
     * _Available since v3.1._
     */
    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);

    /**
     * @dev Emitted when `account` is granted `role`.
     *
     * `sender` is the account that originated the contract call, an admin role
     * bearer except when using {AccessControl-_setupRole}.
     */
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);

    /**
     * @dev Emitted when `account` is revoked `role`.
     *
     * `sender` is the account that originated the contract call:
     *   - if using `revokeRole`, it is the admin role bearer
     *   - if using `renounceRole`, it is the role bearer (i.e. `account`)
     */
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRole(bytes32 role, address account) external view returns (bool);

    /**
     * @dev Returns the admin role that controls `role`. See {grantRole} and
     * {revokeRole}.
     *
     * To change a role's admin, use {AccessControl-_setRoleAdmin}.
     */
    function getRoleAdmin(bytes32 role) external view returns (bytes32);

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function grantRole(bytes32 role, address account) external;

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function revokeRole(bytes32 role, address account) external;

    /**
     * @dev Revokes `role` from the calling account.
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been granted `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `account`.
     */
    function renounceRole(bytes32 role, address account) external;
}

// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: @openzeppelin/contracts/access/AccessControl.sol


// OpenZeppelin Contracts (last updated v4.9.0) (access/AccessControl.sol)

pragma solidity ^0.8.0;





/**
 * @dev Contract module that allows children to implement role-based access
 * control mechanisms. This is a lightweight version that doesn't allow enumerating role
 * members except through off-chain means by accessing the contract event logs. Some
 * applications may benefit from on-chain enumerability, for those cases see
 * {AccessControlEnumerable}.
 *
 * Roles are referred to by their `bytes32` identifier. These should be exposed
 * in the external API and be unique. The best way to achieve this is by
 * using `public constant` hash digests:
 *
 * ```solidity
 * bytes32 public constant MY_ROLE = keccak256("MY_ROLE");
 * ```
 *
 * Roles can be used to represent a set of permissions. To restrict access to a
 * function call, use {hasRole}:
 *
 * ```solidity
 * function foo() public {
 *     require(hasRole(MY_ROLE, msg.sender));
 *     ...
 * }
 * ```
 *
 * Roles can be granted and revoked dynamically via the {grantRole} and
 * {revokeRole} functions. Each role has an associated admin role, and only
 * accounts that have a role's admin role can call {grantRole} and {revokeRole}.
 *
 * By default, the admin role for all roles is `DEFAULT_ADMIN_ROLE`, which means
 * that only accounts with this role will be able to grant or revoke other
 * roles. More complex role relationships can be created by using
 * {_setRoleAdmin}.
 *
 * WARNING: The `DEFAULT_ADMIN_ROLE` is also its own admin: it has permission to
 * grant and revoke this role. Extra precautions should be taken to secure
 * accounts that have been granted it. We recommend using {AccessControlDefaultAdminRules}
 * to enforce additional security measures for this role.
 */
abstract contract AccessControl is Context, IAccessControl, ERC165 {
    struct RoleData {
        mapping(address => bool) members;
        bytes32 adminRole;
    }

    mapping(bytes32 => RoleData) private _roles;

    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;

    /**
     * @dev Modifier that checks that an account has a specific role. Reverts
     * with a standardized message including the required role.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     *
     * _Available since v4.1._
     */
    modifier onlyRole(bytes32 role) {
        _checkRole(role);
        _;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);
    }

    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRole(bytes32 role, address account) public view virtual override returns (bool) {
        return _roles[role].members[account];
    }

    /**
     * @dev Revert with a standard message if `_msgSender()` is missing `role`.
     * Overriding this function changes the behavior of the {onlyRole} modifier.
     *
     * Format of the revert message is described in {_checkRole}.
     *
     * _Available since v4.6._
     */
    function _checkRole(bytes32 role) internal view virtual {
        _checkRole(role, _msgSender());
    }

    /**
     * @dev Revert with a standard message if `account` is missing `role`.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     */
    function _checkRole(bytes32 role, address account) internal view virtual {
        if (!hasRole(role, account)) {
            revert(
                string(
                    abi.encodePacked(
                        "AccessControl: account ",
                        Strings.toHexString(account),
                        " is missing role ",
                        Strings.toHexString(uint256(role), 32)
                    )
                )
            );
        }
    }

    /**
     * @dev Returns the admin role that controls `role`. See {grantRole} and
     * {revokeRole}.
     *
     * To change a role's admin, use {_setRoleAdmin}.
     */
    function getRoleAdmin(bytes32 role) public view virtual override returns (bytes32) {
        return _roles[role].adminRole;
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     *
     * May emit a {RoleGranted} event.
     */
    function grantRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        _grantRole(role, account);
    }

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     *
     * May emit a {RoleRevoked} event.
     */
    function revokeRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        _revokeRole(role, account);
    }

    /**
     * @dev Revokes `role` from the calling account.
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been revoked `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `account`.
     *
     * May emit a {RoleRevoked} event.
     */
    function renounceRole(bytes32 role, address account) public virtual override {
        require(account == _msgSender(), "AccessControl: can only renounce roles for self");

        _revokeRole(role, account);
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event. Note that unlike {grantRole}, this function doesn't perform any
     * checks on the calling account.
     *
     * May emit a {RoleGranted} event.
     *
     * [WARNING]
     * ====
     * This function should only be called from the constructor when setting
     * up the initial roles for the system.
     *
     * Using this function in any other way is effectively circumventing the admin
     * system imposed by {AccessControl}.
     * ====
     *
     * NOTE: This function is deprecated in favor of {_grantRole}.
     */
    function _setupRole(bytes32 role, address account) internal virtual {
        _grantRole(role, account);
    }

    /**
     * @dev Sets `adminRole` as ``role``'s admin role.
     *
     * Emits a {RoleAdminChanged} event.
     */
    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
        bytes32 previousAdminRole = getRoleAdmin(role);
        _roles[role].adminRole = adminRole;
        emit RoleAdminChanged(role, previousAdminRole, adminRole);
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * Internal function without access restriction.
     *
     * May emit a {RoleGranted} event.
     */
    function _grantRole(bytes32 role, address account) internal virtual {
        if (!hasRole(role, account)) {
            _roles[role].members[account] = true;
            emit RoleGranted(role, account, _msgSender());
        }
    }

    /**
     * @dev Revokes `role` from `account`.
     *
     * Internal function without access restriction.
     *
     * May emit a {RoleRevoked} event.
     */
    function _revokeRole(bytes32 role, address account) internal virtual {
        if (hasRole(role, account)) {
            _roles[role].members[account] = false;
            emit RoleRevoked(role, account, _msgSender());
        }
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol


// OpenZeppelin Contracts (last updated v4.7.0) (access/Ownable.sol)

pragma solidity ^0.8.0;


/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: @openzeppelin/contracts/utils/math/SafeMath.sol


// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/SafeMath.sol)

pragma solidity ^0.8.0;

// CAUTION
// This version of SafeMath should only be used with Solidity 0.8 or later,
// because it relies on the compiler's built in overflow checks.

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

// File: @openzeppelin/contracts/utils/Address.sol


// OpenZeppelin Contracts (last updated v4.8.0) (utils/Address.sol)

pragma solidity ^0.8.1;

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     *
     * [IMPORTANT]
     * ====
     * You shouldn't rely on `isContract` to protect against flash loan attacks!
     *
     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets
     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract
     * constructor.
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Tool to verify that a low level call to smart-contract was successful, and revert (either by bubbling
     * the revert reason or using the provided one) in case of unsuccessful call or if target was not a contract.
     *
     * _Available since v4.8._
     */
    function verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        if (success) {
            if (returndata.length == 0) {
                // only check isContract if the call was successful and the return data is empty
                // otherwise we already know that it was a contract
                require(isContract(target), "Address: call to non-contract");
            }
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    /**
     * @dev Tool to verify that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason or using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    function _revert(bytes memory returndata, string memory errorMessage) private pure {
        // Look for revert reason and bubble it up if present
        if (returndata.length > 0) {
            // The easiest way to bubble the revert reason is using memory via assembly
            /// @solidity memory-safe-assembly
            assembly {
                let returndata_size := mload(returndata)
                revert(add(32, returndata), returndata_size)
            }
        } else {
            revert(errorMessage);
        }
    }
}

// File: @openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol


// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/draft-IERC20Permit.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
 * https://eips.ethereum.org/EIPS/eip-2612[EIP-2612].
 *
 * Adds the {permit} method, which can be used to change an account's ERC20 allowance (see {IERC20-allowance}) by
 * presenting a message signed by the account. By not relying on {IERC20-approve}, the token holder account doesn't
 * need to send a transaction, and thus is not required to hold Ether at all.
 */
interface IERC20Permit {
    /**
     * @dev Sets `value` as the allowance of `spender` over ``owner``'s tokens,
     * given ``owner``'s signed approval.
     *
     * IMPORTANT: The same issues {IERC20-approve} has related to transaction
     * ordering also apply here.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `deadline` must be a timestamp in the future.
     * - `v`, `r` and `s` must be a valid `secp256k1` signature from `owner`
     * over the EIP712-formatted function arguments.
     * - the signature must use ``owner``'s current nonce (see {nonces}).
     *
     * For more information on the signature format, see the
     * https://eips.ethereum.org/EIPS/eip-2612#specification[relevant EIP
     * section].
     */
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    /**
     * @dev Returns the current nonce for `owner`. This value must be
     * included whenever a signature is generated for {permit}.
     *
     * Every successful call to {permit} increases ``owner``'s nonce by one. This
     * prevents a signature from being used multiple times.
     */
    function nonces(address owner) external view returns (uint256);

    /**
     * @dev Returns the domain separator used in the encoding of the signature for {permit}, as defined by {EIP712}.
     */
    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view returns (bytes32);
}

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

// File: @openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol


// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/utils/SafeERC20.sol)

pragma solidity ^0.8.0;




/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {
    using Address for address;

    function safeTransfer(
        IERC20 token,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    /**
     * @dev Deprecated. This function has issues similar to the ones found in
     * {IERC20-approve}, and its usage is discouraged.
     *
     * Whenever possible, use {safeIncreaseAllowance} and
     * {safeDecreaseAllowance} instead.
     */
    function safeApprove(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        // safeApprove should only be called when setting an initial allowance,
        // or when resetting it to zero. To increase and decrease it, use
        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
        require(
            (value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        uint256 newAllowance = token.allowance(address(this), spender) + value;
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        unchecked {
            uint256 oldAllowance = token.allowance(address(this), spender);
            require(oldAllowance >= value, "SafeERC20: decreased allowance below zero");
            uint256 newAllowance = oldAllowance - value;
            _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
        }
    }

    function safePermit(
        IERC20Permit token,
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal {
        uint256 nonceBefore = token.nonces(owner);
        token.permit(owner, spender, value, deadline, v, r, s);
        uint256 nonceAfter = token.nonces(owner);
        require(nonceAfter == nonceBefore + 1, "SafeERC20: permit did not succeed");
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address-functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(data, "SafeERC20: low-level call failed");
        if (returndata.length > 0) {
            // Return data is optional
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}

// File: contracts/Quicker.sol


pragma solidity ^0.8.9;






// @custom:security-contact james98099@gmail.com
// @dev:This contract was created for use in graduation project
//      This contract uses QKRW token as currency

/**
 * @dev declare Qkrw(ERC20) contract
 */

contract QuickerDelivery is Ownable, AccessControl {
    bytes32 public constant CHANGE_FEE_ROLE = keccak256("Only the quicker CA can change the fee.");
    bytes32 public constant SET_ROLE = keccak256("SET_ROLE");
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    // unit is % / 10 ex) 10 = 1%, 15 = 1.5%
    /**
     * @dev indicating the commission from order price
     */
    struct Commission {
        uint16 platformFeeRate;
        uint16 insuranceFeeRate;
        uint16 securityDepositRate;
    }
    Commission public commissionRate;

    /**
     * @dev The contract client or quicker is calling
     */
    address feeGovernor; // 수수료 투표 컨트랙
    address insuranceFeeCollector;
    uint256 claimQuickerTokenAmount; // ex) 1 * 1e18
    IERC20 public QuickerToken;
    IERC20 public qkrwToken;
    // Qkrw public token;

    event OrderCreated(uint256 orderNum);
    event OrderResult(bool result);
    event DepositedFee(bool result);
    event ChangedBalance(bool result);
    event AcceptedOrderNumber(uint256 orderNum);
    event deliveredOrderNumber(uint256 orderNum);
    event completedOrderNumber(uint256 orderNum);

    /**
     * @dev indicating the current status of order
     */
    enum State {
        created,
        matched,
        completed,
        failed,
        canceled
    }

    // structure of order
    struct Order {
        uint256 orderNumber;
        address client;
        address quicker;
        State state;
        uint256 orderPrice;
        uint256 securityDeposit;
        uint256 limitedTime;
        uint256 createdTime;
        uint256 matchedTime;
        uint256 deliveredTime;
        uint256 completedTime;
    }

    // array for order
    Order[] public orderList;

    // OrderList number => Client address
    mapping(uint256 => address) public clientOfOrder;
    // OrderList number => Quicker address
    mapping(uint256 => address) public quickerOfOrder;

    // Client address => OrderList number list
    mapping(address => uint256[]) internal clientOrderList;
    // Quicker address => OrderList number list
    mapping(address => uint256[]) internal quickerOrderList;

    // timestamp => changed value of FeeRate
    // keys array of fee rate changed log
    // Value is timestamp from mapping
    mapping(uint256 => uint16) internal changeLogPlatformFeeRate;
    uint256[] internal platformFeeRateLogKeys;
    
    mapping(uint256 => uint16) internal changeLogInsuranceFeeRate;
    uint256[] internal insuranceFeeRateLogKeys;
    
    mapping(uint256 => uint16) internal changeLogSecurityDepositRate;
    uint256[] internal securityDepositRateLogKeys;

    /**
     * @dev Initializes the contract setting the commission rate
     */
    constructor(
        uint16 _platFormFee,
        uint16 _insuranceFee,
        uint16 _securityDeposit,
        address _QkrwToken,
        address _Quicker,
        address _Platform,
        address _Insurance,
        uint256 _claimQuickerAmount
    ) Ownable() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CHANGE_FEE_ROLE, msg.sender);
        setCommissionRate(0, _platFormFee);
        setCommissionRate(1, _insuranceFee);
        setCommissionRate(2, _securityDeposit);
        qkrwToken = IERC20(_QkrwToken);
        QuickerToken = IERC20(_Quicker);
        feeGovernor = _Platform;
        insuranceFeeCollector = _Insurance;
        claimQuickerTokenAmount = _claimQuickerAmount;
    }

    modifier isClientOfOrder(uint256 _orderNum, address _client) {
        require(
            clientOfOrder[_orderNum] == _client,
            "not client of this order"
        );
        _;
    }

    modifier isQuickerOfOrder(uint256 _orderNum, address _quicker) {
        require(
            quickerOfOrder[_orderNum] == _quicker,
            "not quicker of this order"
        );
        _;
    }

    function setFeeCollectionAddress(address _newAddress) external onlyOwner {
        feeGovernor = _newAddress;
    }

    function setInsuranceFeeCollection(address _newAddress) external onlyOwner {
        insuranceFeeCollector = _newAddress;
    }

    function getCurrentTime() internal view returns (uint256) {
        return block.timestamp;
    }

    function calculateFee(uint256 _orderPrice, uint16 _feeRate)
        internal
        pure
        returns (uint256)
    {
        return (_orderPrice * uint256(_feeRate)) / 1000;
    }

    function getMulTokenAmount(uint256 _amount)
        internal
        pure
        returns (uint256)
    {
        return _amount.mul(1e18);
    }

    function getOrder(uint256 _orderNum) external view returns (Order memory) {
        return orderList[_orderNum];
    }

    /**
    @dev To get latest orders based on the specified number of orders.
    @param _amount The number of orders to return.
    @return An array of Order objects representing the latest orders in the orderList.
    */
    function getOrdersForLatest(uint256 _amount) public view returns (Order[] memory) {
        require(_amount > 0, "_amount must be bigger than 0!");
        uint256 arrSize;
        if (_amount >= orderList.length) {
            return orderList;
        }
        arrSize = _amount;
        uint256 lastOrderNum = orderList.length - 1;
        Order[] memory getterOrders = new Order[](arrSize);
        uint256 j = 0;
        for (uint256 i=lastOrderNum; i>=orderList.length-arrSize; i--) {
            getterOrders[j] = orderList[i];
            j++;
        }
        return getterOrders;
    }

    /**
    @dev Returns an array of orders in bundles of _amount, starting from the most recent order and going backwards.
    @param _amount The number of orders per bundle.
    @param _bundleNum The index of the bundle to return, starting from 1.
    @return An array of _amount orders starting from the (_amount * (_bundleNum - 1) + 1)-th most recent order.
    */
    function getOrdersForLatestBundle(uint256 _amount, uint256 _bundleNum) external view returns (Order[] memory) {
        require(_amount > 0, "_amount must be bigger than 0!");
        require(_amount <= orderList.length, "_amount is wrong!");
        require(_bundleNum > 0, "_bundleNum must be bigger than 0!");
        require(_bundleNum <= orderList.length / _amount, "_bundleNum is wrong!");
        uint256 lastOrderNum = orderList.length - 1;
        Order[] memory getterOrders = new Order[](_amount);
        uint256 j = 0;
        uint256 sIndex = lastOrderNum - (_amount * (_bundleNum - 1));
        for (uint256 i=sIndex; i>=sIndex+1-_amount; i--) {
            getterOrders[j] = orderList[i];
            j++;
        }
        return getterOrders;
    }

    function getClientOrderList(address _client)
        external
        view
        returns (uint256[] memory)
    {
        return clientOrderList[_client];
    }

    function getQuickerOrderList(address _quicker)
        external
        view
        returns (uint256[] memory)
    {
        return quickerOrderList[_quicker];
    }

    // _num == 0, platform fee
    // _num == 1, insurance fee
    // _num == 2, security deposit fee
    function setCommissionRate(uint8 _num, uint16 _changedRate) internal {
        require((_num == 0)||(_num == 1) || (_num == 2), "Invalid number");
        if (_num == 0) {
            commissionRate.platformFeeRate = _changedRate;
            platformFeeRateLogKeys.push(getCurrentTime());
            changeLogPlatformFeeRate[getCurrentTime()] = _changedRate;
        } else if (_num == 1) {
            commissionRate.insuranceFeeRate = _changedRate;
            insuranceFeeRateLogKeys.push(getCurrentTime());
            changeLogInsuranceFeeRate[getCurrentTime()] = _changedRate;
        } else {
            commissionRate.securityDepositRate = _changedRate;
            securityDepositRateLogKeys.push(getCurrentTime());
            changeLogSecurityDepositRate[getCurrentTime()] = _changedRate;
        }
    }

    // _num == 0, platform fee
    // _num == 1, insurance fee
    // _num == 2, security deposit fee
    function changeCommissionRate(uint8 _num, uint16 _changedRate) external onlyRole(CHANGE_FEE_ROLE) {
        setCommissionRate(_num, _changedRate);
    }

    function setClaimQuickerAmount(uint256 _amount) external onlyRole(SET_ROLE) {
        claimQuickerTokenAmount = _amount;
    }

    function getCommissionRate() view external returns(Commission memory){
        return commissionRate;
    }

    function transferTokensToOtherAddress(address _to, uint256 _amount)
        internal
    {
        (bool success, ) = address(qkrwToken).call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                _to,
                _amount
            )
        );
        require(success);
    }

    function recieveTokensFromOtherAddress(address _from, uint256 _amount)
        internal
    {
        (bool success, ) = address(qkrwToken).call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                _from,
                address(this),
                _amount
            )
        );
        require(success);
    }

    /**
     * @dev To get orderlist that is matched with state
     * @param _state current state from Order
     * @return Order array
     */
    function getOrdersForState(State _state)
        external
        view
        returns (Order[] memory)
    {
        uint256 numGetterOrders = 0;

        for (uint256 i = 0; i < orderList.length; i++) {
            if (orderList[i].state == _state) {
                numGetterOrders++;
            }
        }

        Order[] memory getterOrders = new Order[](numGetterOrders);
        uint256 j = 0;
        for (uint256 i = 0; i < orderList.length; i++) {
            if (orderList[i].state == _state) {
                getterOrders[j] = orderList[i];
                j++;
            }
        }

        return getterOrders;
    }

    /**
    @dev Creates a new Order by the client and deposits QKRW tokens to the contract
    @param _orderPrice The payment amount of the client
    @param _limitedTime Timestamp value (in seconds) for the delivery deadline
    @notice This function is used by the client to create a new Order and deposit QKRW tokens.
    @notice _orderPrice must be greater than or equal to 0, and _limitedTime must be later than the current time.
    @notice After the Order object is created and a new order number is issued, it is added to the list associated with the client account and the overall order list.
    @notice Finally, QKRW tokens are transferred from the client address to this contract account.
     */
    function createOrder(uint256 _orderPrice, uint256 _limitedTime) external {
        require(
            _limitedTime >= getCurrentTime(),
            "The deadline must later than the current time!"
        );
        require(_orderPrice > 0, "Order price must bigger than 0!");
        uint256 orderNum = orderList.length;
        uint256 amount = getMulTokenAmount(_orderPrice);
        clientOfOrder[orderNum] = msg.sender;
        Order memory newOrder = Order(
            orderNum,
            msg.sender,
            address(0),
            State.created,
            _orderPrice,
            0,
            _limitedTime,
            getCurrentTime(),
            0,
            0,
            0
        );
        recieveTokensFromOtherAddress(msg.sender, amount);
        orderList.push(newOrder);
        clientOrderList[msg.sender].push(orderNum);
        emit OrderCreated(orderNum);
        emit ChangedBalance(true);
        emit OrderResult(true);
    }

    /**
    @dev Function for a client to cancel an Order
    Cannot be canceled once matched with a delivery person
    @param _orderNum Order number
    @notice This function allows clients to cancel their Orders.
    Orders that have been matched with a delivery person cannot be canceled.
    @notice If the order is canceled successfully, the corresponding QKRW tokens will be refunded to the client's wallet.
    */
    function cancelOrder(uint256 _orderNum)
        external
        isClientOfOrder(_orderNum, msg.sender)
    {
        require(
            orderList[_orderNum].state == State.created,
            "Matched with another quicker..."
        );
        orderList[_orderNum].state = State.canceled;
        uint256 refundAmount = getMulTokenAmount(
            orderList[_orderNum].orderPrice
        );
        transferTokensToOtherAddress(msg.sender, refundAmount);
        emit ChangedBalance(true);
        emit OrderResult(true);
    }

    /**
    @dev Function executed when a delivery person accepts an order created by a client
    @param _orderNum Order number
    @notice This function is used when a delivery person accepts an order created by a client.
    @notice It cannot be executed if the order is already matched with another delivery person or canceled.
    @notice It cannot be executed if the delivery deadline for the order has already passed.
    @notice The security deposit fee is calculated based on the price of the order and transferred from the delivery person's account to the contract account.
    @notice When the delivery person accepts the order, the information for the order is updated and the order is changed to a matched state with the current delivery person.
    @notice The security deposit is entrusted to the delivery person's account and will be returned when the order is completed and settled.
    */
    function acceptOrder(uint256 _orderNum) external {
        Order storage order = orderList[_orderNum];
        require(
            order.state == State.created,
            "Already matched with another quicker..."
        );
        require(order.limitedTime > getCurrentTime(), "Already canceled");
        uint256 _securityDeposit = calculateFee(
            order.orderPrice,
            commissionRate.securityDepositRate
        );
        order.quicker = msg.sender;
        order.securityDeposit = _securityDeposit;
        order.state = State.matched;
        order.matchedTime = getCurrentTime();
        quickerOfOrder[_orderNum] = msg.sender;
        quickerOrderList[msg.sender].push(_orderNum);
        uint256 formatedDeposit = getMulTokenAmount(_securityDeposit);
        recieveTokensFromOtherAddress(msg.sender, formatedDeposit);
        emit OrderResult(true);
        emit ChangedBalance(true);
        emit AcceptedOrderNumber(_orderNum);
    }

    // 배송원 배달완료 시간 기입 함수
    function deliveredOrder(uint256 _orderNum)
        external
        isQuickerOfOrder(_orderNum, msg.sender)
    {
        Order storage order = orderList[_orderNum];
        require(
            order.state == State.matched,
            "State is not matched"
        );
        require(order.deliveredTime == 0, "Already delivered");
        require(order.limitedTime + 12 hours >= getCurrentTime(), "Please contact customer service center");
        order.deliveredTime = getCurrentTime();
        emit OrderResult(true);
        emit deliveredOrderNumber(_orderNum);
    }

    // client 계약 완료 함수
    function completeOrder(uint256 _orderNum)
        external
        isClientOfOrder(_orderNum, msg.sender)
    {
        require(
            orderList[_orderNum].state == State.matched,
            "You can not complete before matched"
        );
        orderList[_orderNum].state = State.completed;
        orderList[_orderNum].completedTime = getCurrentTime();
        (bool mintSuccess, ) = address(QuickerToken).call(
            abi.encodeWithSignature(
                "mint(address,uint256)",
                msg.sender,
                claimQuickerTokenAmount
            )
        );
        require(mintSuccess);
        emit OrderResult(true);
        emit completedOrderNumber(_orderNum);
    }

    /**
    @dev Function for the settlement of quicker.
    @param _orderNum : The order number
    @notice This function is used when the quicker requests to withdraw the security deposit after the order is completed.
    @notice Quicker can withdraw the security deposit only after the order is completed or when the limited time for the order has passed.
    @notice If the delivery is made after the limited time, the security deposit is returned to the client, and the order price minus platform fee and insurance fee is transferred to the quicker.
    @notice If the delivery is made before the limited time, the security deposit and the order price minus platform fee and insurance fee is transferred to the quicker.
    @notice The information related to function execution can be confirmed through events.
    */
    function withdrawFromOrder(uint256 _orderNum)
        external
        isQuickerOfOrder(_orderNum, msg.sender)
    {
        Order storage order = orderList[_orderNum];
        require(order.securityDeposit != 0, "already withdraw!");
        require(
            order.state == State.completed ||
                (order.limitedTime + 12 hours < getCurrentTime() &&
                    order.state == State.matched),
            "You can't withdraw deposit now"
        );
        uint256 platformFee = calculateFee(
            order.orderPrice,
            commissionRate.platformFeeRate
        );
        uint256 insuranceFee = calculateFee(
            order.orderPrice,
            commissionRate.insuranceFeeRate
        );
        uint256 toQuickerAmount;
        // deadline 넘김
        if (order.deliveredTime > order.limitedTime) {
            toQuickerAmount = order.orderPrice - platformFee - insuranceFee;
            transferTokensToOtherAddress(
            order.client,
            getMulTokenAmount(order.securityDeposit)
            );
        } else {
            toQuickerAmount = order.securityDeposit + order.orderPrice - platformFee - insuranceFee;
        }
        transferTokensToOtherAddress(
            feeGovernor,
            getMulTokenAmount(platformFee)
        ); 
        (bool success, ) = address(feeGovernor).call(
            abi.encodeWithSignature(
                "addTotalIncome(uint256)",
                getMulTokenAmount(platformFee)
            )
        );
        require(success);
        transferTokensToOtherAddress(
            insuranceFeeCollector,
            getMulTokenAmount(insuranceFee)
        );
        transferTokensToOtherAddress(
            msg.sender,
            getMulTokenAmount(toQuickerAmount)
        );
        order.state = State.completed;
        order.securityDeposit = 0;
        (bool mintSuccess, ) = address(QuickerToken).call(
            abi.encodeWithSignature(
                "mint(address,uint256)",
                msg.sender,
                claimQuickerTokenAmount
            )
        );
        require(mintSuccess);
        emit DepositedFee(true);
        emit ChangedBalance(true);
    }

    /**
    @dev failedOrder function
    @param _orderNum order number
    @notice This function is executed when the delivery person fails to deliver the package and the client executes the function.
    @notice If the deadline + 12 hours is less than the current time and deliveredTime is 0, the function can be executed.
    @notice The security deposit and order price (excluding commission) are returned to the client.
    */
    function failedOrder(uint256 _orderNum) external isClientOfOrder(_orderNum, msg.sender) {
        Order storage order = orderList[_orderNum];
        require(order.state == State.matched, "State is not matched");
        require((order.limitedTime + 12 hours < getCurrentTime()) && (order.deliveredTime == 0), "You can't process order to failed");
        // todo: 보증금 + 의뢰금 반환(수수료 제외)
        uint256 platformFee = calculateFee(
            order.orderPrice,
            commissionRate.platformFeeRate
        );
        uint256 insuranceFee = calculateFee(
            order.orderPrice,
            commissionRate.insuranceFeeRate
        );
        transferTokensToOtherAddress(
            feeGovernor,
            getMulTokenAmount(platformFee)
        );
        (bool success, ) = address(feeGovernor).call(
            abi.encodeWithSignature(
                "addTotalIncome(uint256)",
                getMulTokenAmount(platformFee)
            )
        );
        require(success);
        transferTokensToOtherAddress(
            insuranceFeeCollector,
            getMulTokenAmount(insuranceFee)
        );
        // 수수료를 제외한 반환금 전송 (의뢰 가격 + 배송원 보증금)
        uint256 toClientAmount = order.securityDeposit + order.orderPrice - platformFee - insuranceFee;
        transferTokensToOtherAddress(
            msg.sender,
            getMulTokenAmount(toClientAmount)
        );
        order.state = State.failed;
        order.securityDeposit = 0;
        (bool mintSuccess, ) = address(QuickerToken).call(
            abi.encodeWithSignature(
                "mint(address,uint256)",
                msg.sender,
                claimQuickerTokenAmount
            )
        );
        require(mintSuccess);
        emit OrderResult(true);
        emit DepositedFee(true);
        emit ChangedBalance(true);
    }
}

// File: contracts/QuickerFeeGovernor.sol


pragma solidity ^0.8.9;







/// @custom:security-contact james98099@gmail.com
contract QuickerFeeGovernor is Ownable, AccessControl {
    bytes32 public constant ADD_TOTAL_INCOME_ROLE = keccak256("ADD_TOTAL_INCOME_ROLE");
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    event changedRound(uint256);
    event updatedVote(bool);
    event addTotalIncomeData(uint256);

    IERC20 public QkrwToken;
    IERC20 public QuickerToken;
    IERC20 public vQuickerToken; // 투표권 역할 토큰
    address public quickerDelivery; // 배송 컨트랙

    uint256 public insuranceFeeRate; // 보험 수수료는 관리자만 조정 가능
    uint256 public currentRound; // 현재 라운드
    uint256 public nextSundayMidnight; // 다음 일요일 자정(한국 시간)
    uint16 public changeFeeIndex; // 수수료 변동값 ex) 5 -> 0.5%
    uint256 public finishRoundRewards; // finishRound함수 호출 유저 보상량, 단위 :  1e18

    // 투표 주제별 수량 정보
    struct Topic {
        uint256 totalVotedIncrease; // 수수료 인상
        uint256 totalVotedFreeze; // 수수료 동결
        uint256 totalVotedDecrease; // 수수료 인하
    }

    // 유권자가 투표한 수량 정보
    struct Voter { 
        Topic treasuryFee;
        Topic securityDepositFee;
        uint256 lastVoteRound; // 0 -> 투표 x 상태, 개별 라운드 정보 업데이트 여부 판별
    }

    // 개별 라운드 정보 (주제별 득표량, Qkrw수익금)
    struct RoundInfo {
        Topic treasuryFee; // 정수
        Topic securityDepositFee; // 정수
        uint256 totalIncome; // 단위 : 1e18
    }

    // 라운드 기록
    mapping(uint256 => RoundInfo) public roundLog;
    // 유권자 투표 정보
    mapping(address => Voter) public voters;

    constructor (IERC20 _qkrwToken, IERC20 _quickerToken, IERC20 _vQuickerToken, address _deliveryContract, uint256 _nextSundayMidnight) Ownable() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADD_TOTAL_INCOME_ROLE, msg.sender);
        QkrwToken = _qkrwToken;
        QuickerToken = _quickerToken;
        vQuickerToken = _vQuickerToken;
        quickerDelivery = _deliveryContract;
        currentRound = 1;
        nextSundayMidnight = _nextSundayMidnight;
        changeFeeIndex = 5;
        finishRoundRewards = 1000000000000000000;
    }

    // 현재 라운드 이자 수익 호출 함수
    function getCurrentTreasuryIncome() public view returns(uint256) {
        return roundLog[currentRound].totalIncome;
    }

    // 유저 이전 투표 라운드 이자 수익 호출 함수

    // 투표 함수
    // _treasury -> 인상0, 동결1, 인하2, _securityDeposit -> 인상0, 동결1, 인하2
    function castVote(uint8 _treasury, uint256 _treasuryVoteAmount, uint8 _securityDeposit, uint256 _secuVoteAmount) external returns(bool) {
        uint256 userVotePower = vQuickerToken.balanceOf(msg.sender).div(1e18);
        require(_treasuryVoteAmount == _secuVoteAmount, "vote power must be same");
        require(_treasury == 0 || _treasury == 1 || _treasury == 2, "vote number is wrong");
        require(_securityDeposit == 0 || _securityDeposit == 1 || _securityDeposit == 2, "vote number is wrong");
        // 투표
        Topic storage votedTreasury = voters[msg.sender].treasuryFee;
        require(userVotePower.sub(votedTreasury.totalVotedIncrease.add(votedTreasury.totalVotedFreeze).add(votedTreasury.totalVotedDecrease)) >= _treasuryVoteAmount, "insufficient vote power");
        
        Topic storage votedSecu = voters[msg.sender].securityDepositFee;
        Topic storage totalVotedTreasury = roundLog[currentRound].treasuryFee;
        Topic storage totalVotedSecu = roundLog[currentRound].securityDepositFee;
        // 투표 내역 저장
        if (_treasury == 0) {
            votedTreasury.totalVotedIncrease = votedTreasury.totalVotedIncrease.add(_treasuryVoteAmount);
            totalVotedTreasury.totalVotedIncrease = totalVotedTreasury.totalVotedIncrease.add(_treasuryVoteAmount);
        } else if (_treasury == 1) {
            votedTreasury.totalVotedFreeze = votedTreasury.totalVotedFreeze.add(_treasuryVoteAmount);
            totalVotedTreasury.totalVotedFreeze = totalVotedTreasury.totalVotedFreeze.add(_treasuryVoteAmount);
        } else {
            votedTreasury.totalVotedDecrease = votedTreasury.totalVotedDecrease.add(_treasuryVoteAmount);
            totalVotedTreasury.totalVotedDecrease = totalVotedTreasury.totalVotedDecrease.add(_treasuryVoteAmount);
        }
        if (_securityDeposit == 0) {
            votedSecu.totalVotedIncrease = votedSecu.totalVotedIncrease.add(_secuVoteAmount);
            totalVotedSecu.totalVotedIncrease = totalVotedSecu.totalVotedIncrease.add(_secuVoteAmount);
        } else if (_securityDeposit == 1) {
            votedSecu.totalVotedFreeze = votedSecu.totalVotedFreeze.add(_secuVoteAmount);
            totalVotedSecu.totalVotedFreeze = totalVotedSecu.totalVotedFreeze.add(_secuVoteAmount);
        } else {
            votedSecu.totalVotedDecrease = votedSecu.totalVotedDecrease.add(_secuVoteAmount);
            totalVotedSecu.totalVotedDecrease = totalVotedSecu.totalVotedDecrease.add(_secuVoteAmount);
        }
        voters[msg.sender].lastVoteRound = currentRound;
        emit updatedVote(true);
        return true;
    }

    // 수수료 정산 함수
    function claimRewards() public returns(bool) {
        Topic storage votedTreasury = voters[msg.sender].treasuryFee;
        uint256 userVotedAmount = votedTreasury.totalVotedIncrease.add(votedTreasury.totalVotedFreeze).add(votedTreasury.totalVotedDecrease);
        // 수령 여부 확인
        if (voters[msg.sender].lastVoteRound == currentRound || voters[msg.sender].lastVoteRound == 0) {
            return false;
        } else {
            // 해당 라운드 수익 * 유저 투표량 / 전체 투표량
            Topic memory votePowerInfo = roundLog[voters[msg.sender].lastVoteRound].treasuryFee;
            Topic storage votedSecu = voters[msg.sender].securityDepositFee;
            uint256 totalVotePower = votePowerInfo.totalVotedIncrease.add(votePowerInfo.totalVotedFreeze).add(votePowerInfo.totalVotedDecrease);
            uint256 voterIncome = roundLog[voters[msg.sender].lastVoteRound].totalIncome.mul(userVotedAmount.div(totalVotePower));
            (bool transferSuccess, ) = address(QkrwToken).call(
                abi.encodeWithSignature(
                    "transfer(address,uint256)",
                    msg.sender,
                    voterIncome
                )
            );
            require(transferSuccess, "QkrwToken call failed");
            votedTreasury.totalVotedIncrease = 0;
            votedTreasury.totalVotedFreeze = 0;
            votedTreasury.totalVotedDecrease = 0;
            votedSecu.totalVotedIncrease = 0;
            votedSecu.totalVotedFreeze = 0;
            votedSecu.totalVotedDecrease = 0;
            voters[msg.sender].lastVoteRound = 0;
            return true;
        }

    }

    // 라운드 넘기는 함수 - 일요일 자정 이후로 호출 가능
    function finishRound() external returns(bool) {
        require(block.timestamp >= nextSundayMidnight, "Not sundayMidnight");
        (uint16 currentPlatform, uint16 currentSecu) = getCommissionRate();
        uint16[2] memory voteResult = getTopVotedTopics();
        uint16 nextPlatformFee = currentPlatform;
        uint16 nextSecuFee = currentSecu;
        if (voteResult[0] == 1) {
            nextPlatformFee = currentPlatform + changeFeeIndex;
        } else if (voteResult[0] == 3) {
            nextPlatformFee = currentPlatform - changeFeeIndex;
        }
        if (voteResult[1] == 1) {
            nextSecuFee = currentSecu + changeFeeIndex;
        } else if (voteResult[1] == 3) {
            nextSecuFee = currentSecu - changeFeeIndex;
        }
        (bool isSetPlatform, ) = address(quickerDelivery).call(
            abi.encodeWithSignature(
                "changeCommissionRate(uint8,uint16)",
                0,
                nextPlatformFee
            )
        );
        require(isSetPlatform, "quickerDelivery call failed");
        (bool isSetSecu, ) = address(quickerDelivery).call(
            abi.encodeWithSignature(
                "changeCommissionRate(uint8,uint16)",
                2,
                nextSecuFee
            )
        );
        require(isSetSecu, "quickerDelivery call failed");
        (bool mintSuccess, ) = address(QuickerToken).call(
            abi.encodeWithSignature(
                "mint(address,uint256)",
                msg.sender,
                finishRoundRewards
            )
        );
        require(mintSuccess, "QuickerToken call failed");
        nextSundayMidnight = nextSundayMidnight.add(604800);
        currentRound = currentRound.add(1);
        emit changedRound(currentRound.add(1)); // 다음 라운드 값 방출
        return true;
    }

    // 현재 라운드 totalIncome 추가 함수 (QuickerDelivery 컨트랙이 QKRW 토큰 전송 후 호출), _income -> 1e18
    function addTotalIncome(uint256 _income) external onlyRole(ADD_TOTAL_INCOME_ROLE) {
        roundLog[currentRound].totalIncome = roundLog[currentRound].totalIncome.add(_income);
        emit addTotalIncomeData(_income);
    }

    // QuickerDelivery 컨트랙의 플랫폼 수수료 호출 함수
    function getCommissionRate() internal view returns (uint16 platformFeeRate, uint16 securityDepositRate) {
        QuickerDelivery quickerDrvy = QuickerDelivery(quickerDelivery);
        QuickerDelivery.Commission memory commission = quickerDrvy.getCommissionRate();
        return (commission.platformFeeRate, commission.securityDepositRate);
    }

    // 주제별 최다 득표 반환 함수, 1 -> 인상, 2 -> 동결, 3 -> 인하
    function getTopVotedTopics() internal view returns (uint16[2] memory) {
        uint16[2] memory topVotedTopics;
        RoundInfo memory roundInfo = roundLog[currentRound];
        // 플랫폼 수수료 투표 결과
        if (roundInfo.treasuryFee.totalVotedIncrease >= roundInfo.treasuryFee.totalVotedFreeze && roundInfo.treasuryFee.totalVotedIncrease >= roundInfo.treasuryFee.totalVotedDecrease) {
            topVotedTopics[0] = 1;
        } else if (roundInfo.treasuryFee.totalVotedFreeze >= roundInfo.treasuryFee.totalVotedIncrease && roundInfo.treasuryFee.totalVotedFreeze >= roundInfo.treasuryFee.totalVotedDecrease) {
            topVotedTopics[0] = 2;
        } else {
            topVotedTopics[0] = 3;
        }
        // 보증금 투표 결과
        if (roundInfo.securityDepositFee.totalVotedIncrease >= roundInfo.securityDepositFee.totalVotedFreeze && roundInfo.securityDepositFee.totalVotedIncrease >= roundInfo.securityDepositFee.totalVotedDecrease) {
            topVotedTopics[1] = 1;
        } else if (roundInfo.securityDepositFee.totalVotedFreeze >= roundInfo.securityDepositFee.totalVotedIncrease && roundInfo.securityDepositFee.totalVotedFreeze >= roundInfo.securityDepositFee.totalVotedDecrease) {
            topVotedTopics[1] = 2;
        } else {
            topVotedTopics[1] = 3;
        }
        return topVotedTopics;
    }
    // 보험 수수료 설정 함수
    function setInsuranceFee(uint256 _rate) external onlyOwner {
        insuranceFeeRate = _rate;
    }

    // 수수료 변동률 설정 함수
    function setChangeFeeIndex(uint16 _rate) external onlyOwner {
        changeFeeIndex = _rate;
    }

    // finishRound 함수 실행 보상 수량 설정 함수
    function setFinishRoundRewards(uint256 _amount) external onlyOwner {
        finishRoundRewards = _amount;
    }

    // 긴급 투표 마감시간 변경 함수
    function emergencySetNextSunday(uint256 _timestamp) external onlyOwner {
        nextSundayMidnight = _timestamp;
    }
}