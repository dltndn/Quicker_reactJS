import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useClientConfirmState } from "../../pages/ClientConfirmPage";
import { useEffect, useState } from "react";
import DeliveryTracker from "../DeliveryTracker";
import { create } from "zustand";
import Handler from "../../lib/Handler";
import { getOrder } from "../../utils/ExecuteOrderFromBlockchain";
import delelteDoubleQuote from "../../lib/DeleteDoubleQuote";

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
      alert("해당 배송원의 현재 위치정보를 불러올 수 없습니다.")
    }
    
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
      <div>픽업예정</div>
      <br />
      <div>{deadline}까지</div>
      <br />
      <DeliveryTracker mapHeight="45em"/>
      <button
        onClick={async () => {refreshQuickerLocation()}}
        style={{
          position: "absolute",
          top: "52em",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
        }}
      >
        현재 위치 확인하기
      </button>
    </>
  );
}
