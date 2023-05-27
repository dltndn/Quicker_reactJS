import Handler from "../../lib/Handler";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  getOrderList,
  getOrders,
} from "../../utils/ExecuteOrderFromBlockchain";
import Kakao from "../../lib/Kakao";
import { formatedDate } from "../../utils/ConvertTimestampToDate";

export default function MainOrderInformation() {
  const { address } = useAccount();
  const [isDelivering, setIsDelivering] = useState<boolean | null>(null);
  const [showOrderObj, setShowOrderObj] = useState<any | null>(null);

  const getDestination = async (orderNum: number) => {
    const orderDataFromDB = await Handler.post(
      { list: orderNum },
      process.env.REACT_APP_SERVER_URL + "orderlist"
    );
    return orderDataFromDB[0].Destination
  };

  const getLatestMatchedOrder = async (isClient: boolean) => {
    const obj = { orderNum: "-1" };
    try {
      const orderList = await getOrderList(address, isClient);
      if (orderList?.length === 0) {
        return obj;
      }
      const result = await getOrders(orderList);
      const reversedResult = result.slice().reverse();
      for (const order of reversedResult) {
        if (order.state === "matched") {
          return order;
        }
      }
      return obj;
    } catch (e) {
      console.log(e);
    }
  };

  const getOrderToShow = async () => {
    const clientResult = await getLatestMatchedOrder(true);
    const quickerResult = await getLatestMatchedOrder(false);
    const clientOrderNum = Number(clientResult.orderNum);
    const quickerOrderNum = Number(quickerResult.orderNum);
    if (clientOrderNum === quickerOrderNum) {
      return;
    } else if (quickerOrderNum === -1) {
      setIsDelivering(false);
      setShowOrderObj(clientResult);
      // 배송 현황 리다이렉트 버튼 제공
    } else {
      setIsDelivering(true);
      const destinationInfo = await getDestination(quickerOrderNum)
      let destinationAddress = await Kakao.reverseGeoCording(destinationInfo.Y, destinationInfo.X);
      quickerResult["destination"] = destinationAddress
      setShowOrderObj(quickerResult);
    }
  };

  useEffect(() => {
    getOrderToShow();
  }, []);

  return (
    <>
      {isDelivering === null ? (
        <>물건 배송을 의뢰하거나 직접 배달을 해보세요</>
      ) : (
        <>
          {isDelivering ? (
            <>
              <div>{formatedDate(showOrderObj.limitedTime)} 까지</div>
              <br></br>
              <div>{showOrderObj.destination.address_name}에 배달을 완료해주세요</div>
              <br></br>
              <div>{showOrderObj.orderPrice}의 수익이 예상돼요!</div>
              <br></br>
              <div>배송 애니메이션</div>
            </>
          ) : (
            <>배송원 배송 현황 페이지 리다이렉트</>
          )}
        </>
      )}
    </>
  );
}

// orderNum -> number 타입으로 변환
// let orderDataFromDB = await Handler.post(
//     { list: orderNum },
//     process.env.REACT_APP_SERVER_URL + "orderlist"
//   );
