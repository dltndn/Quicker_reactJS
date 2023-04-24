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
//      * @dev 의뢰인이 새로운 Order를 생성하며 컨트랙에 QKRW 토큰을 입금한다
//      * @param _orderPrice 의뢰인의 결제 금액
//      * @param _limitedTime 배송 기한의 Timestamp값(초단위)
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
//     }

//     /**
//      * @dev 의뢰인이 Order를 취소하는 함수
//      *      배송원과 매칭시 취소 불가
//      * @param _orderNum Order number
//      */
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
//         emit OrderResult(true);
//     }

//     function acceptOrder(uint256 _orderNum) public {
//         Order storage order = orderList[_orderNum];
//         require(
//             order.state == State.created,
//             "Already matched with another quicker..."
//         );
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
//     }

//     // 배송원 배달완료 시간 입력 함수
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

//     // quicker 정산 함수
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
//         emit OrderResult(true);
//         emit DepositedFee(true);
//     }

//     // failedOrder 함수
//     // 상황: 배달원 물건 전달 x -> client가 실행
//     // 조건: 마감기한 + 12 hours < 현재시간 일 때 deliverdTime == 0 이면 작동 가능
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
//     }
// }
