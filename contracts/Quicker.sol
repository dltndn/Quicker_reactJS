// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/access/Ownable.sol";

// // @custom:security-contact james98099@gmail.com
// // @dev:This contract was created for use in graduation project
// //      This contract uses QKRW token as currency

// /**
//  * @dev declare Qkrw(ERC20) contract
//  */
// interface Qkrw {
//     function transferFrom(
//         address sender,
//         address recipient,
//         uint256 amount
//     ) external returns (bool);
// }

// contract Quicker is Ownable {
//     // unit is %
//     /**
//      * @dev indicating the commission from order price
//      */
//     struct Commission {
//         uint16 platformFeeRate;
//         uint16 insuranceFeeRate;
//         uint16 securityDepositRate;
//     }
//     Commission public commissionRate;

//     /**
//      * @dev The contract client or quicker is calling
//      */
//     address clientContractAddress;
//     address quickerContractAddress;
//     address public qkrwToken;

//     /**
//      * @dev indicating the current status of order
//      */
//     enum State {
//         created,
//         matched,
//         completed,
//         failed,
//         canceled
//     }

//     // structure of order
//     struct Order {
//         address client;
//         address quicker;
//         State state;
//         uint256 orderPrice;
//         uint256 securityDeposit;
//     }

//     // array for order
//     Order[] public orderList;

//     // OrderList number => Client address
//     mapping(uint256 => address) public clientOfOrder;
//     // OrderList number => Quicker address
//     mapping(uint256 => address) public quickerOfOrder;

//     /**
//      * @dev Initializes the contract setting the commission rate
//      */
//     constructor(
//         uint16 _platFormFee,
//         uint16 _insuranceFee,
//         uint16 _securityDeposit,
//         address _QkrwToken
//     ) Ownable() {
//         commissionRate = Commission(
//             _platFormFee,
//             _insuranceFee,
//             _securityDeposit
//         );
//         qkrwToken = _QkrwToken;
//     }

//     modifier isClientContract() {
//         require(msg.sender == clientContractAddress, "not clientContract");
//         _;
//     }

//     modifier isQuickerContract() {
//         require(msg.sender == quickerContractAddress, "not quickerContract");
//         _;
//     }

//     function setClientContract(address _newContract) public onlyOwner {
//         clientContractAddress = _newContract;
//     }

//     function setQuickerContract(address _newContract) public onlyOwner {
//         quickerContractAddress = _newContract;
//     }

//     function setCommissionRate(
//         uint16 _platFormFee,
//         uint16 _insuranceFee,
//         uint16 _securityDeposit
//     ) public onlyOwner {
//         commissionRate = Commission(
//             _platFormFee,
//             _insuranceFee,
//             _securityDeposit
//         );
//     }

//     function transferTokensToOtherContract(
//         address otherContractAddress,
//         uint256 amount
//     ) public {
//         Qkrw token = Qkrw(qkrwToken);
//         require(
//             token.transferFrom(msg.sender, otherContractAddress, amount),
//             "Token transfer failed"
//         );
//     }

//     // test
//     function createOrder(address _clientWalletAddress, uint256 _orderPrice)
//         public
//     {
//         uint256 orderNum = orderList.length;
//         clientOfOrder[orderNum] = _clientWalletAddress;
//         Order memory newOrder = Order(
//             _clientWalletAddress,
//             address(0),
//             State.created,
//             _orderPrice,
//             0
//         );
//         orderList.push(newOrder);
//     }

//     // test
//     function acceptOrder(
//         address _quickerWalletAddress,
//         uint256 _securityDeposit,
//         uint256 _orderNum
//     ) public {
//         require(
//             orderList[_orderNum].state == State.created,
//             "matched with other quicker..."
//         );
//         orderList[_orderNum].quicker = _quickerWalletAddress;
//         orderList[_orderNum].securityDeposit = _securityDeposit;
//         orderList[_orderNum].state = State.matched;
//         quickerOfOrder[_orderNum] = _quickerWalletAddress;
//     }

//     // todo list
//     // - 생성자에 client, quicker contract 선언하기
//     // - test용 함수 test 후 modifier 붙이기
// }
