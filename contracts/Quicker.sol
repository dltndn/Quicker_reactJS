// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// // @custom:security-contact james98099@gmail.com
// // @dev:This contract was created for use in graduation project
// //      This contract uses QKRW token as currency

// /**
//  * @dev declare Qkrw(ERC20) contract
//  */

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
//     ERC20 public qkrwToken;
//     // Qkrw public token;

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
//         uint256 limitedTime;
//         uint256 createdTime;
//         uint256 matchedTime;
//         uint256 completedTime;
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
//         qkrwToken = ERC20(_QkrwToken);
//     }

//     modifier isClientContract() {
//         require(msg.sender == clientContractAddress, "not clientContract");
//         _;
//     }

//     modifier isQuickerContract() {
//         require(msg.sender == quickerContractAddress, "not quickerContract");
//         _;
//     }

//     modifier isClientOfOrder(uint256 _orderNum, address _client) {
//         require(clientOfOrder[_orderNum] == _client, "not client of this order");
//         _;
//     }

//     modifier isQuickerOfOrder(uint256 _orderNum, address _quicker) {
//         require(clientOfOrder[_orderNum] == _quicker, "not quicker of this order");
//         _;
//     }

//     function setClientContract(address _newContract) public onlyOwner {
//         clientContractAddress = _newContract;
//     }

//     function setQuickerContract(address _newContract) public onlyOwner {
//         quickerContractAddress = _newContract;
//     }

//     function getTokenDecimals() internal view returns (uint8){
//         ERC20 token = qkrwToken;
//         return token.decimals();
//     }

//     function getCurrentTime() internal view returns (uint256) {
//         return block.timestamp;
//     }

//     function getMulTokenAmount(uint256 _amount) internal view returns (uint256) {
//         return _amount * (10 ** getTokenDecimals());
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

//     function transferTokensToOtherAddress(
//         address _to,
//         uint256 _amount
//     ) internal {
//         ERC20 token = qkrwToken;
//         token.transfer(_to, _amount);
//     }

//     function recieveTokensFromOtherAddress(
//         address _from,
//         uint256 _amount
//     ) internal {
//         ERC20 token = qkrwToken;
//         token.transferFrom(_from, address(this), _amount);
//     }

//     function createOrder(uint256 _orderPrice, uint256 _limitedTime)
//         public
//     {
//         uint256 orderNum = orderList.length;
//         uint256 amount = _orderPrice * (10 ** getTokenDecimals());
//         clientOfOrder[orderNum] = msg.sender;
//         Order memory newOrder = Order(
//             msg.sender,
//             address(0),
//             State.created,
//             _orderPrice,
//             0,
//             _limitedTime,
//             getCurrentTime(),
//             0,
//             0
//         );
//         recieveTokensFromOtherAddress(msg.sender, amount);
//         orderList.push(newOrder);
//     }

//     function cancelOrder(uint256 _orderNum) public isClientOfOrder(_orderNum, msg.sender) {
//         require(
//             orderList[_orderNum].state == State.created,
//             "Matched with another quicker..."
//         );
//         orderList[_orderNum].state = State.canceled;
//         uint256 refundAmount = getMulTokenAmount(orderList[_orderNum].orderPrice);
//         transferTokensToOtherAddress(msg.sender, refundAmount);
//     }

//     function acceptOrder(
//         uint256 _securityDeposit,
//         uint256 _orderNum
//     ) public {
//         require(
//             orderList[_orderNum].state == State.created,
//             "Already matched with another quicker..."
//         );
//         orderList[_orderNum].quicker = msg.sender;
//         orderList[_orderNum].securityDeposit = _securityDeposit;
//         orderList[_orderNum].state = State.matched;
//         orderList[_orderNum].matchedTime = getCurrentTime();
//         quickerOfOrder[_orderNum] = msg.sender;
//         uint256 formatedDeposit = getMulTokenAmount(_securityDeposit);
//         transferTokensToOtherAddress(msg.sender, formatedDeposit);
//     }



//     // todo list
//     // - test용 함수 test 완료 후 modifier 붙이기
// }
