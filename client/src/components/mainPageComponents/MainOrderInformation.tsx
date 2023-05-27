import Handler from "../../lib/Handler";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  getOrderList,
  getOrders,
} from "../../utils/ExecuteOrderFromBlockchain";

export default function MainOrderInformation() {
  const { address } = useAccount();
  const [isDelivering, setIsDelivering] = useState<boolean | null>(null);
  const [showOrderObj, setShowOrderObj] = useState<any | null>(null)

  const getLatestMatchedOrder = async (isClient: boolean) => {
    const obj = {orderNum: "-1"}
    try {
      const orderList = await getOrderList(address, isClient);
      if (orderList?.length === 0) {
        return obj;
      }
      const result = await getOrders(orderList);
      const reversedResult = result.slice().reverse();
      for (const order of reversedResult) {
        if (order.state === "matched") {
            return order
        }
      }
      return obj
    } catch (e) {
      console.log(e);
    }
  };

  const getOrderToShow = async () => {
    const clientResult = await getLatestMatchedOrder(true);
    const quickerResult = await getLatestMatchedOrder(false);
    const clientOrderNum = Number(clientResult.orderNum)
    const quickerOrderNum = Number(quickerResult.orderNum)
    console.log(clientResult)
    console.log(quickerResult)
    if (clientOrderNum === quickerOrderNum) {
        return
    } else if (quickerOrderNum === -1) {
        setIsDelivering(false)
        setShowOrderObj(clientResult)
        // 배송 현황 리다이렉트 버튼 제공
    } else {
        setIsDelivering(true)
        setShowOrderObj(quickerResult)
    }
  };

  useEffect(() => {
    getOrderToShow();
  }, []);

  return (
    <>
    <>{JSON.stringify(showOrderObj)}</>
      {isDelivering === null ? (
        <>물건 배송을 의뢰하거나 직접 배달을 해보세요</>
      ) : (
        <>
          {isDelivering ? (
            <>배송 정보</>
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
