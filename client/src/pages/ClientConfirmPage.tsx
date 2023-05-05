import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create } from "zustand";
import TopBarOthers from "../components/topBarOthers";
import DeliveryStatus from "../components/deliveryProgress/DeliveryStatus";
import CompletedOrderConfirm from "../components/deliveryProgress/CompletedOrderConfirm";
import FailedOrderConfirm from "../components/deliveryProgress/FailedOrderConfirm";
import { getOrderLawData } from "../utils/ExecuteOrderFromBlockchain";
import { LoadingDeliveryProgress } from "../components/LoadingAnimation";
import { getDateFromTimestamp, formatedDateHM } from "../utils/ConvertTimestampToDate";

interface ClientConfirmState {
    title: string;
    setTitle: (newData: string) => void;
    showComponent: JSX.Element;
    setShowComponent: (newData: JSX.Element) => void;
  }
  
  export const useClientConfirmState = create<ClientConfirmState>((set) => ({
    title: "",
    setTitle: (title: string) => set({title}),
    showComponent: <></>,
    setShowComponent: (showComponent: JSX.Element) => set({showComponent}),
  }));

export default function ClientConfirmPage() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const { title, showComponent, setShowComponent} = useClientConfirmState()

  const setComponentLogic = async () => {
    // order.deliveredTime !== null -> 배송완료
    // (deadline + 12h < currentTime && deliveredTime === null) -> 배송실패
    // (deadLine + 12h >= currentTime && deliveredTime === null) -> 배송현황
    const currentTime = Math.floor(Date.now() / 1000)
    const twelveHoursToSec = 12 * 60 * 60
    if (orderNumber !== undefined) {
        try {
            const blockchainOrder: any = await getOrderLawData(orderNumber)
            if (blockchainOrder.deliveredTime.toNumber() === 0) {
                if((blockchainOrder.limitedTime.toNumber() + twelveHoursToSec) >= currentTime) {
                    let deadlineHM = formatedDateHM(getDateFromTimestamp(blockchainOrder.limitedTime.toNumber()))
                    setShowComponent(<DeliveryStatus orderNum={orderNumber} deadline={deadlineHM}/>)
                } else {
                  let isReceived: boolean = false
                  if(blockchainOrder.securityDeposit.toNumber() === 0) {
                    isReceived = true
                  }
                  setShowComponent(<FailedOrderConfirm orderNum={orderNumber} isReceived={isReceived}/>)
                }
            } else {
                setShowComponent(<CompletedOrderConfirm orderNum={orderNumber} />)
            }
        } catch(e) {
            console.log(e)
        }
    }
  }

  useEffect(() => {
    setShowComponent(<LoadingDeliveryProgress />)    

    setComponentLogic()
  }, [])

  return <>
    <TopBarOthers
        title={title}
        redirectLogic={function () {
          navigate("/orderlist");
        }}
      ></TopBarOthers>
      {showComponent}
      <button onClick={() => setShowComponent(<DeliveryStatus orderNum={orderNumber} deadline="20:00"/>)}>배송원 실시간 위치 조회 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<CompletedOrderConfirm orderNum={orderNumber}/>)}>배송성공 확인 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<FailedOrderConfirm orderNum={orderNumber} isReceived={false}/>)}>배송실패 확인 컴포넌트 이동</button>
  </>;
}
