import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useClientConfirmState } from "../../pages/ClientConfirmPage";
import { useEffect, useState } from "react";
import DeliveryTracker from "../DeliveryTracker";
import { create } from "zustand";
import Handler from "../../lib/Handler";
import { getOrder } from "../../utils/ExecuteOrderFromBlockchain";
import delelteDoubleQuote from "../../lib/DeleteDoubleQuote";
import Lottie from "lottie-react";
import lodingAni from '../../Lottie/lodingAni.json';
import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";
import finduser from "../../Lottie/81378-find-user-location.json";

const whitePin = require('../../image/dep-icon-gif-unscreen.gif');
const redPin = require('../../image/des-icon-gif-unscreen.gif');


interface DeliveryStatusProps extends ExecutionComponentProps {
  deadline: string;
}

interface QuickerLocationState {
  coordiX: number | null;
  setCoordiX: (data: number | null) => void;
  coordiY: number | null;
  setCoordiY: (data: number | null) => void;
}

export const useQuickerLocationState = create<QuickerLocationState>((set) => ({
  coordiX: null,
  setCoordiX: (coordiX: number | null) => set({ coordiX }),
  coordiY: null,
  setCoordiY: (coordiY: number | null) => set({ coordiY }),
}));

export default function DeliveryStatus({orderNum, deadline}: DeliveryStatusProps) {
  const { setTitle } = useClientConfirmState();
  const { setCoordiX, setCoordiY } = useQuickerLocationState();
  const [orderData, setOrderData] = useState<any>({});

  const initalizeOrderData = async (orderNum: string | undefined) => {
    if (orderNum !== undefined) {
      const orderData = await getOrder(orderNum)
      setOrderData(orderData)
    }
  }

  const refreshQuickerLocation = async () => {
    try {
      if (orderData !== undefined && orderData.quicker !== undefined ) {
        // 값을 불러오는 fetch
        const deliverWalletAddress = delelteDoubleQuote(orderData.quicker)
        
        const response = await fetch(process.env.REACT_APP_SERVER_URL+`test/?quicker=${deliverWalletAddress}`)
        const json = await response.json()
        console.log(json)
        if (json.data === null) throw new Error("해당 배송원의 현재 위치정보를 불러올 수 없습니다.")
        
        // 해당 X,Y좌표를 수정
        setCoordiX(json.data.Y);
        setCoordiY(json.data.X);
      }
    } catch (error) {
      console.error(error)
      console.log("해당 배송원의 현재 위치정보를 불러올 수 없습니다.")
    }
    // setCoordiX(127.12);
    // setCoordiY(37.33);
  };

  useEffect(() => {
    (async()=> {
      setTitle("배송현황");
      await initalizeOrderData(orderNum);
    })()
    return () => {
      setCoordiX(null);
      setCoordiY(null);
    };
  }, []);

  

  return (
    <>
    <Div0>
      <Div1>
      <Pin1 src={whitePin}/>
      <DivSp>픽업예정</DivSp>
      </Div1>
      <Div1>
      <Pin1 src={redPin}/>
      <DivSp>{deadline}까지</DivSp>
      </Div1>
    </Div0>
      <Lottie animationData={lodingAni} />
      <DeliveryTracker mapHeight="45em" orderNum={orderNum}/>
      <Posst onClick={async () => {refreshQuickerLocation()}}>
        <Lottie animationData={finduser} />
      </Posst>
    </>
  );
}

const Posst = styled.div`
  position: fixed;
  width: 50px;
  bottom: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Pin1 = styled.img`
  width: 35px;
`
const Div0 = styled.div`
    display: flex;
    justify-content: space-between;

`
const Div1 = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
    margin: 0 20px 0 20px;
`
const DivSp = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding-top: 10px;
`