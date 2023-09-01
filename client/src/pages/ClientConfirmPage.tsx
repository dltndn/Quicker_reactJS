import { useState, useEffect, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create } from "zustand";
import TopBarOthers from "../components/topBarOthers";
import { getOrderRawData } from "../utils/ExecuteOrderFromBlockchain";
import { LoadingDeliveryProgress } from "../components/LoadingAnimation";
import { getDateFromTimestamp, formatedDateHM } from "../utils/ConvertTimestampToDate";
import SuspenseComponent from "../components/SuspenseComponent";

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

  const DeliveryStatus = lazy(() => import("../components/deliveryProgress/DeliveryStatus"))
  const CompletedOrderConfirm = lazy(() => import("../components/deliveryProgress/CompletedOrderConfirm"))
  const FailedOrderConfirm = lazy(() => import("../components/deliveryProgress/FailedOrderConfirm"))

  const setComponentLogic = async () => {
    // order.deliveredTime !== null -> 배송완료
    // (deadline + 12h < currentTime && deliveredTime === null) -> 배송실패
    // (deadLine + 12h >= currentTime && deliveredTime === null) -> 배송현황
    const currentTime = Math.floor(Date.now() / 1000)
    const twelveHoursToSec = 12 * 60 * 60
    if (orderNumber !== undefined) {
        try {
            const blockchainOrder: any = await getOrderRawData(orderNumber)
            if (Number(blockchainOrder.deliveredTime) === 0) {
                if((Number(blockchainOrder.limitedTime) + twelveHoursToSec) >= currentTime) {
                    let deadlineHM = formatedDateHM(getDateFromTimestamp(Number(blockchainOrder.limitedTime)))
                    setShowComponent(<SuspenseComponent component={<DeliveryStatus orderNum={orderNumber} deadline={deadlineHM}/>} />)
                } else {
                  let isReceived: boolean = false
                  if(Number(blockchainOrder.securityDeposit) === 0) {
                    isReceived = true
                  }
                  setShowComponent(<SuspenseComponent component={<FailedOrderConfirm orderNum={orderNumber} isReceived={isReceived}/>} />)
                }
            } else {
                setShowComponent(<SuspenseComponent component={<CompletedOrderConfirm orderNum={orderNumber} />} />)
            }
        } catch(e) {
            console.log(e)
        }
    }
  }

  useEffect(() => {
    setShowComponent(<SuspenseComponent component={<LoadingDeliveryProgress />} />)    
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
  </>;
}
