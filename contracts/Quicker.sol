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
//     // unit is % / 10 ex) 10 = 1%, 15 = 1.5%
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
//     address feeCollector;
//     address insuranceFeeCollector;
//     ERC20 public qkrwToken;
//     // Qkrw public token;

//     event OrderCreated(uint256 orderNum);
//     event OrderResult(bool result);
//     event DepositedFee(bool result);
//     event ChangedBalance(bool result);

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
//         uint256 orderNumber;
//         address client;
//         address quicker;
//         State state;
//         uint256 orderPrice;
//         uint256 securityDeposit;
//         uint256 limitedTime;
//         uint256 createdTime;
//         uint256 matchedTime;
//         uint256 deliveredTime;
//         uint256 completedTime;
//     }

//     // array for order
//     Order[] public orderList;

//     // OrderList number => Client address
//     mapping(uint256 => address) public clientOfOrder;
//     // OrderList number => Quicker address
//     mapping(uint256 => address) public quickerOfOrder;

//     // Client address => OrderList number list
//     mapping(address => uint256[]) internal clientOrderList;
//     // Quicker address => OrderList number list
//     mapping(address => uint256[]) internal quickerOrderList;

//     // timestamp => changed value of FeeRate
//     // keys array of fee rate changed log
//     // Value is timestamp from mapping
//     mapping(uint256 => uint16) internal changeLogPlatformFeeRate;
//     uint256[] internal platformFeeRateLogKeys;
    
//     mapping(uint256 => uint16) internal changeLogInsuranceFeeRate;
//     uint256[] internal insuranceFeeRateLogKeys;
    
//     mapping(uint256 => uint16) internal changeLogSecurityDepositRate;
//     uint256[] internal securityDepositRateLogKeys;

//     /**
//      * @dev Initializes the contract setting the commission rate
//      */
//     constructor(
//         uint16 _platFormFee,
//         uint16 _insuranceFee,
//         uint16 _securityDeposit,
//         address _QkrwToken,
//         address _Platform,
//         address _Insurance
//     ) Ownable() {
//         setCommissionRate(0, _platFormFee);
//         setCommissionRate(1, _insuranceFee);
//         setCommissionRate(2, _securityDeposit);
//         qkrwToken = ERC20(_QkrwToken);
//         feeCollector = _Platform;
//         insuranceFeeCollector = _Insurance;
//     }

//     modifier isClientOfOrder(uint256 _orderNum, address _client) {
//         require(
//             clientOfOrder[_orderNum] == _client,
//             "not client of this order"
//         );
//         _;
//     }

//     modifier isQuickerOfOrder(uint256 _orderNum, address _quicker) {
//         require(
//             quickerOfOrder[_orderNum] == _quicker,
//             "not quicker of this order"
//         );
//         _;
//     }

//     function setFeeCollectionAddress(address _newAddress) public onlyOwner {
//         feeCollector = _newAddress;
//     }

//     function setInsuranceFeeCollection(address _newAddress) public onlyOwner {
//         insuranceFeeCollector = _newAddress;
//     }

//     function getTokenDecimals() internal view returns (uint8) {
//         ERC20 token = qkrwToken;
//         return token.decimals();
//     }

//     function getCurrentTime() internal view returns (uint256) {
//         return block.timestamp;
//     }

//     function calculateFee(uint256 _orderPrice, uint16 _feeRate)
//         internal
//         pure
//         returns (uint256)
//     {
//         return (_orderPrice * uint256(_feeRate)) / 1000;
//     }

//     function getMulTokenAmount(uint256 _amount)
//         internal
//         view
//         returns (uint256)
//     {
//         return _amount * (10**getTokenDecimals());
//     }

//     function getOrder(uint256 _orderNum) public view returns (Order memory) {
//         return orderList[_orderNum];
//     }

//     /**
//     @dev To get latest orders based on the specified number of orders.
//     @param _amount The number of orders to return.
//     @return An array of Order objects representing the latest orders in the orderList.
//     */
//     function getOrdersForLatest(uint256 _amount) public view returns (Order[] memory) {
//         require(_amount > 0, "_amount must be bigger than 0!");
//         uint256 arrSize;
//         if (_amount >= orderList.length) {
//             return orderList;
//         }
//         arrSize = _amount;
//         uint256 lastOrderNum = orderList.length - 1;
//         Order[] memory getterOrders = new Order[](arrSize);
//         uint256 j = 0;
//         for (uint256 i=lastOrderNum; i>=orderList.length-arrSize; i--) {
//             getterOrders[j] = orderList[i];
//             j++;
//         }
//         return getterOrders;
//     }

//     /**
//     @dev Returns an array of orders in bundles of _amount, starting from the most recent order and going backwards.
//     @param _amount The number of orders per bundle.
//     @param _bundleNum The index of the bundle to return, starting from 1.
//     @return An array of _amount orders starting from the (_amount * (_bundleNum - 1) + 1)-th most recent order.
//     */
//     function getOrdersForLatestBundle(uint256 _amount, uint256 _bundleNum) public view returns (Order[] memory) {
//         require(_amount > 0, "_amount must be bigger than 0!");
//         require(_amount <= orderList.length, "_amount is wrong!");
//         require(_bundleNum > 0, "_bundleNum must be bigger than 0!");
//         require(_bundleNum <= orderList.length / _amount, "_bundleNum is wrong!");
//         uint256 lastOrderNum = orderList.length - 1;
//         Order[] memory getterOrders = new Order[](_amount);
//         uint256 j = 0;
//         uint256 sIndex = lastOrderNum - (_amount * (_bundleNum - 1));
//         for (uint256 i=sIndex; i>=sIndex+1-_amount; i--) {
//             getterOrders[j] = orderList[i];
//             j++;
//         }
//         return getterOrders;
//     }

//     function getClientOrderList(address _client)
//         public
//         view
//         returns (uint256[] memory)
//     {
//         return clientOrderList[_client];
//     }

//     function getQuickerOrderList(address _quicker)
//         public
//         view
//         returns (uint256[] memory)
//     {
//         return quickerOrderList[_quicker];
//     }

//     // _num == 0, platform fee
//     // _num == 1, insurance fee
//     // _num == 2, security deposit fee
//     function setCommissionRate(uint8 _num, uint16 _changedRate) internal {
//         require((_num == 0)||(_num == 1) || (_num == 2), "Invalid number");
//         if (_num == 0) {
//             commissionRate.platformFeeRate = _changedRate;
//             platformFeeRateLogKeys.push(getCurrentTime());
//             changeLogPlatformFeeRate[getCurrentTime()] = _changedRate;
//         } else if (_num == 1) {
//             commissionRate.insuranceFeeRate = _changedRate;
//             insuranceFeeRateLogKeys.push(getCurrentTime());
//             changeLogInsuranceFeeRate[getCurrentTime()] = _changedRate;
//         } else {
//             commissionRate.securityDepositRate = _changedRate;
//             securityDepositRateLogKeys.push(getCurrentTime());
//             changeLogSecurityDepositRate[getCurrentTime()] = _changedRate;
//         }
//     }

//     function changeCommissionRate(uint8 _num, uint16 _changedRate) public onlyOwner {
//         setCommissionRate(_num, _changedRate);
//     }

//     function getCommissionRate() view public returns(Commission memory){
//         return commissionRate;
//     }

//     function transferTokensToOtherAddress(address _to, uint256 _amount)
//         internal
//     {
//         ERC20 token = qkrwToken;
//         token.transfer(_to, _amount);
//     }

//     function recieveTokensFromOtherAddress(address _from, uint256 _amount)
//         internal
//     {
//         ERC20 token = qkrwToken;
//         token.transferFrom(_from, address(this), _amount);
//     }

//     /**
//      * @dev To get orderlist that is matched with state
//      * @param _state current state from Order
//      * @return Order array
//      */
//     function getOrdersForState(State _state)
//         public
//         view
//         returns (Order[] memory)
//     {
//         uint256 numGetterOrders = 0;

//         for (uint256 i = 0; i < orderList.length; i++) {
//             if (orderList[i].state == _state) {
//                 numGetterOrders++;
//             }
//         }

//         Order[] memory getterOrders = new Order[](numGetterOrders);
//         uint256 j = 0;
//         for (uint256 i = 0; i < orderList.length; i++) {
//             if (orderList[i].state == _state) {
//                 getterOrders[j] = orderList[i];
//                 j++;
//             }
//         }

//         return getterOrders;
//     }

//     /**
//     @dev Creates a new Order by the client and deposits QKRW tokens to the contract
//     @param _orderPrice The payment amount of the client
//     @param _limitedTime Timestamp value (in seconds) for the delivery deadline
//     @notice This function is used by the client to create a new Order and deposit QKRW tokens.
//     @notice _orderPrice must be greater than or equal to 0, and _limitedTime must be later than the current time.
//     @notice After the Order object is created and a new order number is issued, it is added to the list associated with the client account and the overall order list.
//     @notice Finally, QKRW tokens are transferred from the client address to this contract account.
//      */
//     function createOrder(uint256 _orderPrice, uint256 _limitedTime) public {
//         require(
//             _limitedTime >= getCurrentTime(),
//             "The deadline must later than the current time!"
//         );
//         require(_orderPrice > 0, "Order price must bigger than 0!");
//         uint256 orderNum = orderList.length;
//         uint256 amount = getMulTokenAmount(_orderPrice);
//         clientOfOrder[orderNum] = msg.sender;
//         Order memory newOrder = Order(
//             orderNum,
//             msg.sender,
//             address(0),
//             State.created,
//             _orderPrice,
//             0,
//             _limitedTime,
//             getCurrentTime(),
//             0,
//             0,
//             0
//         );
//         recieveTokensFromOtherAddress(msg.sender, amount);
//         orderList.push(newOrder);
//         clientOrderList[msg.sender].push(orderNum);
//         emit OrderCreated(orderNum);
//         emit ChangedBalance(true);
//         emit OrderResult(true);
//     }

//     /**
//     @dev Function for a client to cancel an Order
//     Cannot be canceled once matched with a delivery person
//     @param _orderNum Order number
//     @notice This function allows clients to cancel their Orders.
//     Orders that have been matched with a delivery person cannot be canceled.
//     @notice If the order is canceled successfully, the corresponding QKRW tokens will be refunded to the client's wallet.
//     */
//     function cancelOrder(uint256 _orderNum)
//         public
//         isClientOfOrder(_orderNum, msg.sender)
//     {
//         require(
//             orderList[_orderNum].state == State.created,
//             "Matched with another quicker..."
//         );
//         orderList[_orderNum].state = State.canceled;
//         uint256 refundAmount = getMulTokenAmount(
//             orderList[_orderNum].orderPrice
//         );
//         transferTokensToOtherAddress(msg.sender, refundAmount);
//         emit ChangedBalance(true);
//         emit OrderResult(true);
//     }

//     /**
//     @dev Function executed when a delivery person accepts an order created by a client
//     @param _orderNum Order number
//     @notice This function is used when a delivery person accepts an order created by a client.
//     @notice It cannot be executed if the order is already matched with another delivery person or canceled.
//     @notice It cannot be executed if the delivery deadline for the order has already passed.
//     @notice The security deposit fee is calculated based on the price of the order and transferred from the delivery person's account to the contract account.
//     @notice When the delivery person accepts the order, the information for the order is updated and the order is changed to a matched state with the current delivery person.
//     @notice The security deposit is entrusted to the delivery person's account and will be returned when the order is completed and settled.
//     */
//     function acceptOrder(uint256 _orderNum) public {
//         Order storage order = orderList[_orderNum];
//         require(
//             order.state == State.created,
//             "Already matched with another quicker..."
//         );
//         require(order.limitedTime < getCurrentTime(), "Already canceled");
//         uint256 _securityDeposit = calculateFee(
//             order.orderPrice,
//             commissionRate.securityDepositRate
//         );
//         order.quicker = msg.sender;
//         order.securityDeposit = _securityDeposit;
//         order.state = State.matched;
//         order.matchedTime = getCurrentTime();
//         quickerOfOrder[_orderNum] = msg.sender;
//         quickerOrderList[msg.sender].push(_orderNum);
//         uint256 formatedDeposit = getMulTokenAmount(_securityDeposit);
//         recieveTokensFromOtherAddress(msg.sender, formatedDeposit);
//         emit OrderResult(true);
//         emit ChangedBalance(true);
//     }

//     // 배송원 배달완료 시간 기입 함수
//     function deliveredOrder(uint256 _orderNum)
//         public
//         isQuickerOfOrder(_orderNum, msg.sender)
//     {
//         Order storage order = orderList[_orderNum];
//         require(
//             order.state == State.matched,
//             "State is not matched"
//         );
//         require(order.deliveredTime == 0, "Already delivered");
//         require(order.limitedTime + 12 hours >= getCurrentTime(), "Please contact customer service center");
//         order.deliveredTime = getCurrentTime();
//         emit OrderResult(true);
//     }

//     // client 계약 완료 함수
//     function completeOrder(uint256 _orderNum)
//         public
//         isClientOfOrder(_orderNum, msg.sender)
//     {
//         require(
//             orderList[_orderNum].state == State.matched,
//             "You can not complete before matched"
//         );
//         orderList[_orderNum].state = State.completed;
//         orderList[_orderNum].completedTime = getCurrentTime();
//         emit OrderResult(true);
//     }

//     /**
//     @dev Function for the settlement of quicker.
//     @param _orderNum : The order number
//     @notice This function is used when the quicker requests to withdraw the security deposit after the order is completed.
//     @notice Quicker can withdraw the security deposit only after the order is completed or when the limited time for the order has passed.
//     @notice If the delivery is made after the limited time, the security deposit is returned to the client, and the order price minus platform fee and insurance fee is transferred to the quicker.
//     @notice If the delivery is made before the limited time, the security deposit and the order price minus platform fee and insurance fee is transferred to the quicker.
//     @notice The information related to function execution can be confirmed through events.
//     */
//     function withdrawFromOrder(uint256 _orderNum)
//         public
//         isQuickerOfOrder(_orderNum, msg.sender)
//     {
//         Order storage order = orderList[_orderNum];
//         require(order.securityDeposit != 0, "already withdraw!");
//         require(
//             order.state == State.completed ||
//                 (order.limitedTime + 12 hours < getCurrentTime() &&
//                     order.state == State.matched),
//             "You can't withdraw deposit now"
//         );
//         uint256 platformFee = calculateFee(
//             order.orderPrice,
//             commissionRate.platformFeeRate
//         );
//         uint256 insuranceFee = calculateFee(
//             order.orderPrice,
//             commissionRate.insuranceFeeRate
//         );
//         uint256 toQuickerAmount;
//         // deadline 넘김
//         if (order.deliveredTime > order.limitedTime) {
//             toQuickerAmount = order.orderPrice - platformFee - insuranceFee;
//             transferTokensToOtherAddress(
//             order.client,
//             getMulTokenAmount(order.securityDeposit)
//             );
//         } else {
//             toQuickerAmount = order.securityDeposit + order.orderPrice - platformFee - insuranceFee;
//         }
//         transferTokensToOtherAddress(
//             feeCollector,
//             getMulTokenAmount(platformFee)
//         );
//         transferTokensToOtherAddress(
//             insuranceFeeCollector,
//             getMulTokenAmount(insuranceFee)
//         );
//         transferTokensToOtherAddress(
//             msg.sender,
//             getMulTokenAmount(toQuickerAmount)
//         );
//         order.state = State.completed;
//         order.securityDeposit = 0;
//         emit DepositedFee(true);
//         emit ChangedBalance(true);
//     }

//     /**
//     @dev failedOrder function
//     @param _orderNum order number
//     @notice This function is executed when the delivery person fails to deliver the package and the client executes the function.
//     @notice If the deadline + 12 hours is less than the current time and deliveredTime is 0, the function can be executed.
//     @notice The security deposit and order price (excluding commission) are returned to the client.
//     */
//     function failedOrder(uint256 _orderNum) public isClientOfOrder(_orderNum, msg.sender) {
//         Order storage order = orderList[_orderNum];
//         require(order.state == State.matched, "State is not matched");
//         require((order.limitedTime + 12 hours < getCurrentTime()) && (order.deliveredTime == 0), "You can't process order to failed");
//         // todo: 보증금 + 의뢰금 반환(수수료 제외)
//         uint256 platformFee = calculateFee(
//             order.orderPrice,
//             commissionRate.platformFeeRate
//         );
//         uint256 insuranceFee = calculateFee(
//             order.orderPrice,
//             commissionRate.insuranceFeeRate
//         );
//         transferTokensToOtherAddress(
//             feeCollector,
//             getMulTokenAmount(platformFee)
//         );
//         transferTokensToOtherAddress(
//             insuranceFeeCollector,
//             getMulTokenAmount(insuranceFee)
//         );
//         // 수수료를 제외한 반환금 전송 (의뢰 가격 + 배송원 보증금)
//         uint256 toClientAmount = order.securityDeposit + order.orderPrice - platformFee - insuranceFee;
//         transferTokensToOtherAddress(
//             msg.sender,
//             getMulTokenAmount(toClientAmount)
//         );
//         order.state = State.failed;
//         order.securityDeposit = 0;
//         emit OrderResult(true);
//         emit DepositedFee(true);
//         emit ChangedBalance(true);
//     }
// }
