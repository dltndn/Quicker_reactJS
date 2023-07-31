import React, { createElement, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Tmap from "../components/Tmap";
import Postcode from "../components/Postcode";
import RequestPage from "../components/RequestPage";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers";
import { createGlobalStyle } from "styled-components";
import { create } from 'zustand'
import Time from "../lib/Time"
import { useConnWalletInfo } from "../App";

interface OrderState {
  cost: number;
  setCost: (newCost:number) => void;
  title: string;
  setTitle: (newTitle:string) => void;
  btnContent: string;
  setBtnContent: (newContent:string) => void;
  deadLine: string;
  setDeadLine: (newDeadLine:string) => void;
  showAllowance: boolean;
  setShowAllowance: (newAllowance:boolean) => void;
  createdOrderNum: string | undefined;
  setCreatedOrderNum: (newOrder:string|undefined) => void;
  errorMessage: string | undefined;
  setErrorMessage: (newData: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  cost: 0,
  setCost: (cost: number) => set({cost}),
  title: "출발지 입력",
  setTitle: (title: string) => set({title}),
  btnContent: "결제하기",
  setBtnContent: (btnContent: string) => set({btnContent}),
  deadLine: "1869353472", //2029년
  setDeadLine: (deadLine: string) => set({deadLine}),
  showAllowance: false,
  setShowAllowance: (showAllowance:boolean) => set({showAllowance}),
  createdOrderNum: undefined,
  setCreatedOrderNum: (createdOrderNum:string|undefined) => set({createdOrderNum}),
  errorMessage: undefined,
  setErrorMessage: (errorMessage: string) => set({errorMessage})
}))

interface useDivHandler {
  showCommissionPage: boolean;
  setShowCommissionPage: (showCommissionPage:boolean) => void;
}

export const useDivHandler = create<useDivHandler>(set => ({
  showCommissionPage: true,
  setShowCommissionPage : (showCommissionPage : boolean) =>  set({showCommissionPage})
}))

interface useOrderDataStore {
  orderId: number;
  setOrderId: (orderId: number) => void;
  startAddress: string;
  setStartAddress: (startAddress: string) => void;
  sender: string;
  setSender: (sender: string) => void;
  senderPhoneNumber: string;
  setSenderPhoneNumber: (senderPhoneNumber: string) => void;

  arriveAddress: string;
  setArriveAddress: (value: string) => void;
  receiver: string;
  setReceiver: (value: string) => void;
  receiverPhoneNumber: string;
  setReceiverPhoneNumber: (value: string) => void;

  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  length: number;
  setLength: (value: number) => void;
  weight: number;
  setWeight: (value: number) => void;

  AMPM: string | null;
  setAMPM: (value: string) => void;
  date: string | null;
  setDate: (value: string) => void;
  hour: number | null;
  setHour: (value: number) => void;
  minute: number | null;
  setMinute: (value: number) => void;

  details: string;
  setDetails: (value: string) => void;
  cost: number;
  setCost: (value: number) => void;

  isChecked: isChecked;
  setIsChecked: (value: any) => void;

  reset: () => void;
}

interface isChecked {
    walk: boolean,
    bike: boolean,
    kickboard: boolean,
    motorcycle: boolean,
    car: boolean,
    truck: boolean,
}

export const useOrderDataStore = create<useOrderDataStore>(set => ({
  orderId: 0,
  setOrderId: (orderId: number) => set({ orderId }),
  startAddress: "",
  setStartAddress: (startAddress: string) => set({ startAddress }),
  sender: "",
  setSender: (sender: string) => set({ sender }),
  senderPhoneNumber: "",
  setSenderPhoneNumber: (senderPhoneNumber: string) => set({ senderPhoneNumber }),

  arriveAddress: "",
  setArriveAddress: (arriveAddress: string) => set({ arriveAddress }),
  receiver: "",
  setReceiver: (receiver: string) => set({ receiver }),
  receiverPhoneNumber: "",
  setReceiverPhoneNumber: (receiverPhoneNumber: string) => set({ receiverPhoneNumber }),

  width: 0,
  setWidth: (width: number) => set({ width }),
  height: 0,
  setHeight: (height: number) => set({ height }),
  length: 0,
  setLength: (length: number) => set({ length }),
  weight: 0,
  setWeight: (weight: number) => set({ weight }),

  AMPM: "오전",
  setAMPM: (AMPM: string) => set({ AMPM }),
  date: null,
  setDate: (date: string) => set({ date }),
  hour: null,
  setHour: (hour: number) => set({ hour }),
  minute: null,
  setMinute: (minute: number) => set({ minute }),

  details: "",
  setDetails: (details: string) => set({ details }),
  cost: 0,
  setCost: (cost: number) => set({ cost }),

  isChecked  : {
    walk: false,
    bike: false,
    kickboard: false,
    motorcycle: false,
    car: false,
    truck: false,
  },
  setIsChecked : (isChecked : isChecked) => set({isChecked}),
  reset: () => {
    set({
      orderId: 0,
      startAddress: '',
      sender: '',
      senderPhoneNumber: '',
      arriveAddress: '',
      receiver: '',
      receiverPhoneNumber: '',
      width: 0,
      height: 0,
      length: 0,
      weight: 0,
      AMPM: '오전',
      date: null,
      hour: null,
      minute: null,
      details: '',
      cost: 0,
      isChecked: {
        walk: false,
        bike: false,
        kickboard: false,
        motorcycle: false,
        car: false,
        truck: false,
      },
    });
  },
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
  const { address } = useConnWalletInfo();
  const startinputDiv = useRef<HTMLInputElement>(null);
  const arriveinputDiv = useRef<HTMLInputElement>(null);
  const {showCommissionPage, setShowCommissionPage} = useDivHandler();

  const { title, setTitle, setDeadLine } = useOrderStore()
  const {orderId, startAddress, sender, senderPhoneNumber, arriveAddress, receiver, receiverPhoneNumber, width, height, length, weight, AMPM, date, hour, minute, details, cost, isChecked, reset} = useOrderDataStore();

  const [arrivePosition, setArrivePosition] = useState({})
  const [startPosition, setStartPosition] = useState({})

  const setDeadlineToProp = () => {
    if (date !== null && AMPM !== null && hour !== null && minute !== null) {
      const timeStamp = Time.parseTimeStamp(date , AMPM , hour , minute).toString()
      setDeadLine(timeStamp)
    }
  }

  const forSendData = {
    userWalletAddress : address,
    Order : {
      id: orderId,
      ID_REQ: "",
      ID_DVRY: "",
      DETAIL: details,
      PAYMENT: cost,
      CHECK_RES: 0,
      PICTURE: "",
    },
    Transportation :{
      ID: orderId,
      WALKING: isChecked.walk,
      BICYCLE: isChecked.motorcycle,
      SCOOTER: isChecked.kickboard,
      BIKE: isChecked.bike,
      CAR: isChecked.car,
      TRUCK: isChecked.truck,
    },
    Destination :{
      id: orderId,
      // @ts-ignore
      X: arrivePosition.longitude,
      // @ts-ignore
      Y: arrivePosition.latitude,
      DETAIL: arriveAddress
    },
    Departure :{
      ID: orderId,
      // @ts-ignore
      X: startPosition.longitude,
      // @ts-ignore
      Y: startPosition.latitude,
      DETAIL: startAddress,
    },
    Product : {
      ID: orderId,
      WIDTH: width,
      LENGTH: length,
      HEIGHT: height,
      WEIGHT: weight,
    },
    Sender : {
      ID: orderId,
      NAME: sender,
      PHONE: senderPhoneNumber,
    }, 
    Recipient : {
      id: orderId,
      NAME: receiver,
      PHONE: receiverPhoneNumber,
    }
  }

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

  useEffect(() => {
    return () => {
      reset()
      setShowCommissionPage(true)
      setTitle("출발지 입력")
    }
  }, [])

  useEffect(() => {
    setDeadlineToProp()
  }, [date, AMPM, hour, minute])
  return (
    <>
    <GlobalStyle/>
      <TopBarOthers title={title} redirectLogic={() => redirectionLogic()} />
      <div style={showCommissionPage ? { display: "block" } : { display: "none" }}>
        <Tmap states={{startPosition : startPosition , arrivePosition : arrivePosition}}containerId={"mapContainerBox"}/>
        <Postcode setStates={{setStartPosition : setStartPosition, setArrivePosition : setArrivePosition}} refs={{startinputDiv : startinputDiv, arriveinputDiv : arriveinputDiv}} mapControls={{ showMap: showMap, hideMap: hideMap }} title={title} hideCommissionPage={() => handleCommissionPage()} />
      </div>
      <div style={showCommissionPage ? { display: "none" } : { display: "block" }}>
        <RequestPage
        sendData={forSendData}/>
      </div>
      <BottomBar />
    </>
  );
}

