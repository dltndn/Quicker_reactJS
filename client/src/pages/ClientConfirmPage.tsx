import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create } from "zustand";
import TopBarOthers from "../components/topBarOthers";
import DeliveryStatus from "../components/deliveryProgress/DeliveryStatus";
import CompletedOrderConfirm from "../components/deliveryProgress/CompletedOrderConfirm";
import FailedOrderConfirm from "../components/deliveryProgress/FailedOrderConfirm";

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

  const showComponentLogic = async () => {
    // order.deliveredTime !== null -> 배송완료
    // (deadline + 12h < currentTime && deliveredTime === null) -> 배송실패
    // (deadLine + 12h >= currentTime && deliveredTime === null) -> 배송현황
    
  }

  useEffect(() => {
    showComponentLogic()
  }, [])

  return <>
    <TopBarOthers
        title={title}
        redirectLogic={function () {
          navigate("/orderlist");
        }}
      ></TopBarOthers>
      {showComponent}
      <button onClick={() => setShowComponent(<DeliveryStatus orderNum={orderNumber}/>)}>배송원 실시간 위치 조회 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<CompletedOrderConfirm orderNum={orderNumber}/>)}>배송성공 확인 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<FailedOrderConfirm orderNum={orderNumber}/>)}>배송실패 확인 컴포넌트 이동</button>
  </>;
}
