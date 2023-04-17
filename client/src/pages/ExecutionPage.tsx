import { create } from "zustand";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import ReceivingItem from "../components/executeComponents/ReceivingItem";
import DeliveredItem from "../components/executeComponents/DeliveredItem";
import CompletedDelivery from "../components/executeComponents/CompletedDelivery";
import FailedDelivery from "../components/executeComponents/FailedDelivery";

interface ExecutionState {
  title: string;
  setTitle: (newData: string) => void;
  showComponent: JSX.Element;
  setShowComponent: (newData: JSX.Element) => void;
}

export const useExecutionState = create<ExecutionState>((set) => ({
  title: "물품 인계",
  setTitle: (title: string) => set({title}),
  showComponent: <></>,
  setShowComponent: (showComponent: JSX.Element) => set({showComponent}),
}));

export default function ExecutionPage() {
  const { orderNumber } = useParams()
  const navigate = useNavigate()
  const { title, showComponent, setShowComponent} = useExecutionState()

  useEffect(() => {
    setShowComponent(<ReceivingItem orderNum={orderNumber}/>)
  }, [])

  return (
    <>
      <GlobalStyle />
      <TopBarOthers
        title={title}
        redirectLogic={function () {
          navigate("/profile");
        }}
      ></TopBarOthers>
      {showComponent}
      <button onClick={() => setShowComponent(<DeliveredItem orderNum={orderNumber}/>)}>물품전달 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<CompletedDelivery />)}>배송완료 컴포넌트 이동</button>
      <button onClick={() => setShowComponent(<FailedDelivery />)}>배송실패 컴포넌트 이동</button>
      <BottomBar></BottomBar>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;
