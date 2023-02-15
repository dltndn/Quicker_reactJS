// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "@openzeppelin/access/Ownable.sol";

// // @custom:security-contact james98099@gmail.com
// // @dev:This contract was created for use in graduation project
// //      This contract uses QKRW token as currency
// contract Quicker is Ownable {
//     // unit is %
//     // indicating the commission from order price
//     struct Commission {
//         uint16 platformFeeRate;
//         uint16 insuranceFeeRate;
//         uint16 securityDepositRate;
//     }
//     Commission commissionRate;

//     // The contract client or quicker is calling
//     address clientContractAddress;
//     address quickerContractAddress;

//     // indicating the current status of order
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

//     modifier isClientContract() {
//         require(msg.sender == clientContractAddress, "not clientContract");
//         _;
//     }

//     modifier isQuickerContract() {
//         require(msg.sender == quickerContractAddress, "not quickerContract");
//         _;
//     }

//     function setClientContract(address _newContract) onlyOwner {
//         clientContractAddress = _newContract;
//     }

//     function setQuickerContract(address _newContract) onlyOwner {
//         quickerContractAddress = _newContract;
//     }

//     function setCommissionRate(uint _platFormFee, uint _insuranceFee, uint _securityDeposit) onlyOwner{
//         Commission commissionRate = Commission(_platFormFee, _insuranceFee, _securityDeposit);
//     }

//     function createOrder(address _clientWalletAddress, uint _orderPrice) public isClientContract {
//         uint orderNum = orderList.length;
//         clientOfOrder[orderNum] = _clientWalletAddress;
//         Order newOrder = orderList.push(Order(_clientWalletAddress, 0, 0, _orderPrice, 0));
//     }

//     // test
//     function createOrder(address _clientWalletAddress, uint _orderPrice) public {
//         uint orderNum = orderList.length;
//         clientOfOrder[orderNum] = _clientWalletAddress;
//         Order newOrder = orderList.push(Order(_clientWalletAddress, 0, 0, _orderPrice, 0));
//     }

//     function getOrder(uint _orderNum) public returns (Order){
//         return orderList[_orderPrice];
//     }

//     //working
// }
