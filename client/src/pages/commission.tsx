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
  
  const [startPosition, setStartPosition] = useState({});
  const [startAddress, setStartAddress] = useState("");
  const [sender , setSender] = useState("");
  const [senderPhoneNumber , setSenderPhoneNumber] = useState("");

  const [arrivePosition, setArrivePosition] = useState({});
  const [arriveAddress, setArriveAddress] = useState("");
  const [receiver , setReceiver] =useState("");
  const [receiverPhoneNumber , setReceiverPhoneNumber] =useState("");

  const [width , setWidth] = useState(0);
  const [height , setHeight] = useState(0);
  const [length , setLength] = useState(0);
  const [weight, setWeight] = useState(0);

  const [AMPM, setAMPM] = useState("")
  const [date, setDate] = useState("")
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)

  const [details , setDetails] =useState("");
  const [cost , setCost] =useState(0);

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

  const test = () => {
    console.log(startPosition, arrivePosition, startAddress,
      sender,
      senderPhoneNumber,
      arriveAddress,
      receiver,
      receiverPhoneNumber,
      width,
      height,
      length,
      weight,
      details,
      cost,
      date,
      hour,
      minute,
      AMPM
    )
  }

  return (
    <>
    <GlobalStyle/>
      <TopBarOthers title={title} redirectLogic={() => redirectionLogic()} />
      <div style={showCommissionPage ? { display: "block" } : { display: "none" }}>
        <Tmap containerId={"mapContainerBox"} startPosition={startPosition} arrivePosition={arrivePosition}/>
        <Postcode refs={{ startinputDiv: startinputDiv, arriveinputDiv: arriveinputDiv, }} mapControls={{ showMap: showMap, hideMap: hideMap }} setStates={{
          setStartPosition: setStartPosition, setArrivePosition: setArrivePosition, setStartAddress: setStartAddress,
          setSender: setSender,
          setSenderPhoneNumber: setSenderPhoneNumber,
          setArriveAddress: setArriveAddress,
          setReceiver: setReceiver,
          setReceiverPhoneNumber: setReceiverPhoneNumber
        }} title={title} hideCommissionPage={() => handleCommissionPage()} />
      </div>
      <button onClick={() => test()}>값 확인</button>
      <div style={showCommissionPage ? { display: "none" } : { display: "block" }}>
        <RequestPage
          setStates={{
            setWidth: setWidth,
            setHeight: setHeight,
            setLength: setLength,
            setWeight: setWeight,
            setDetails: setDetails,
            setCost: setCost,
            setDate: setDate,
            setHour: setHour,
            setMinute: setMinute,
            setAMPM: setAMPM
          }} />
      </div>
      <BottomBar />
    </>
  );
}

