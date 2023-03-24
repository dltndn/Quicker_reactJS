import React, { createElement, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Tmap from "../components/Tmap";
import Postcode from "../components/Postcode";
import { request } from "http";
import RequestPage from "../components/RequestPage";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers";
import { createGlobalStyle } from "styled-components";
import { useAccount } from "wagmi";
import { create } from 'zustand'

interface OrderState {
  cost: number;
  setCost: (newCost:number) => void;
  title: string;
  setTitle: (newTitle:string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  cost: 0,
  setCost: (cost: number) => set({cost}),
  title: "출발지 입력",
  setTitle: (title: string) => set({title}),
}))

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;


const showMap = () =>
  (document.getElementById("TMapApp")!.style.display = "block");

const hideMap = () =>
  (document.getElementById("TMapApp")!.style.display = "none");

const isGeolocation = () => navigator.geolocation;

const getLatLon = () => {
  return new Promise((resolve, rejected) =>
    navigator.geolocation.getCurrentPosition(resolve, rejected)
  );
};

export default function CommissionPage() {
  const navigate = useNavigate();
  const { address } = useAccount();

  const [showCommissionPage, setShowCommissionPage] = useState<boolean>(true);

  const startinputDiv = useRef<HTMLDivElement>(null);
  const arriveinputDiv = useRef<HTMLDivElement>(null);
  // const [title, setTitle] = useState("출발지 입력");
  const [startPosition, setStartPosition] = useState({});
  const [arrivePosition, setArrivePosition] = useState({});

  const { title, setTitle } = useOrderStore()

  const pageBack = () => {
    if (title === "출발지 입력") {
      navigate("/");
    } else if (title === "도착지 입력") {
      setTitle("출발지 입력");
      startinputDiv.current!.style.display = "block";
      arriveinputDiv.current!.style.display = "none";
    } else if (title === "세부사항 입력") {
      setTitle("도착지 입력");
      startinputDiv.current!.style.display = "block";
      arriveinputDiv.current!.style.display = "none";
    }
  };

  const redirectionLogic = () => {
    const backFunc = () => {
      setShowCommissionPage(true);
      pageBack();
    };
    showCommissionPage ? pageBack() : backFunc();
  };

  const handleCommissionPage = () => {
    setShowCommissionPage(false);
  };

  return (
    <>
    <GlobalStyle/>
      <TopBarOthers title={title} redirectLogic={() => redirectionLogic()} />
      <div style={showCommissionPage ? { display: "block" } : { display: "none" }}>
        <Tmap containerId={"mapContainerBox"} startPosition={startPosition} arrivePosition={arrivePosition}/>
        <Postcode refs={{ startinputDiv: startinputDiv, arriveinputDiv: arriveinputDiv,}} mapControls={{ showMap: showMap, hideMap: hideMap }} setStates={{setStartPosition: setStartPosition, setArrivePosition: setArrivePosition,}} title={title} hideCommissionPage={() => handleCommissionPage()}/>
      </div>
      <div style={showCommissionPage ? { display: "none" } : { display: "block" }}>
        <RequestPage />
      </div>
      <BottomBar />
    </>
  );
}
