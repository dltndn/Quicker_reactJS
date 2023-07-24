// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @custom:security-contact james98099@gmail.com
contract QuickerStaking is Ownable, AccessControl {
    bytes32 public constant SET_ROLE = keccak256("SET_ROLE");
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    IERC20 public QuickerToken;
    IERC20 public vQuickerToken; // 투표권 역할 토큰
    uint256 public interestRate; // 이자율 ex) 3 -> 86400블록(24시간)당 0.03%

    // 유저 이자계산 시작 시점 블록번호
    mapping(address => uint256) public startAt;
    // 유저 언스테이킹 가능 시점 블록번호
    mapping(address => uint256) public endAt;
    // 최근 스테이킹 설정 기간
    mapping(address => uint256) public lastSetPeriod;
    // 유저 Quicker토큰 스테이킹 수량
    mapping(address => uint256) public stakerAmounts;

    constructor (address _quicker, address _vQuicker, uint256 _interestRate) {
        _grantRole(SET_ROLE, msg.sender);
        QuickerToken = IERC20(_quicker);
        vQuickerToken = IERC20(_vQuicker);
        interestRate = _interestRate;
    }

    // 파라미터 - 스테이킹 수량, 스테이킹 기간(3개월, 6개월, 9개월)
    function stakeQuicker(uint256 _value, uint256 _period) external returns(bool){
        // 파라미터가 둘 다 정수인 경우에만 함수 실행
        require(_value > 0, "Value should be greater than 0");
        require(QuickerToken.balanceOf(msg.sender) >= _value.mul(1e18), "insufficient token");
        require(_period == 3 || _period == 6 || _period == 9, "Invalid period"); // 3, 6, 9 개월 중 하나여야 함
        require(lastSetPeriod[msg.sender] <= _period);

        // 이자가 있다면 지급
        bool claimSuccess = claimPendingRewards();
        if (!claimSuccess) {
            startAt[msg.sender] = block.number;
        }
        
        endAt[msg.sender] = block.number.add(_period.mul(2592000)); // 스테이킹 기간 * 30 days
        lastSetPeriod[msg.sender] = _period;
        stakerAmounts[msg.sender] += _value;

        QuickerToken.safeTransferFrom(msg.sender, address(this), _value.mul(1e18));

        uint256 mulIndex = 1;
        if (_period == 6) {
            mulIndex = 2;
        } else if (_period == 9) {
            mulIndex = 4;
        }
        // vQuicker 토큰 민트수량 : 스테이킹 기간에 따라 차등
        (bool success, ) = address(vQuickerToken).call(
            abi.encodeWithSignature(
                "mint(address,uint256)",
                msg.sender,
                _value.mul(mulIndex).mul(1e18)
            )
        );
        return success;
    }

    // unstaking - 스테이커 vQuicker토큰 burn, 스테이킹한 Quicker 토큰 전송
    function unstakeQuicker() external returns(bool) {
        require(stakerAmounts[msg.sender] != 0, "didn't staked yet");
        require(block.number >= endAt[msg.sender]);

        // 이자 지급
        bool claimSuccess = claimPendingRewards();
        if (!claimSuccess) {
            return false;
        }

        (bool burnSuccess, ) = address(vQuickerToken).call(
            abi.encodeWithSignature(
                "burnFrom(address,uint256)",
                msg.sender,
                vQuickerToken.balanceOf(msg.sender)
            )
        );
        (bool transferSuccess, ) = address(QuickerToken).call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                msg.sender,
                stakerAmounts[msg.sender]
            )
        );
        startAt[msg.sender] = 0;
        endAt[msg.sender] = 0;
        lastSetPeriod[msg.sender] = 0;
        stakerAmounts[msg.sender] = 0;
        return transferSuccess;
    }

    // 이자 수령
    function claimPendingRewards() public returns (bool) {
        if (stakerAmounts[msg.sender] == 0) {
            return false;
        }
        (bool mintSuccess, ) = address(QuickerToken).call(
            abi.encodeWithSignature(
                "mint(address,uint256)",
                msg.sender,
                getPendingReqwards(msg.sender)
            )
        );
        if (mintSuccess) {
            startAt[msg.sender] = block.number;
        }
        return true;
    }

    // 쌓인 이자 조회
    function getPendingReqwards(address _staker) public view returns (uint256) {
        if(startAt[_staker] == 0) {
            return 0;
        }
        uint256 totalBlocks = block.number.sub(startAt[_staker]);
        return vQuickerToken.balanceOf(_staker).mul(totalBlocks).mul(interestRate).div(864000000);
    }

    function setInterestRate(uint256 _rate) external onlyRole(SET_ROLE) {
        interestRate = _rate;
    }
}