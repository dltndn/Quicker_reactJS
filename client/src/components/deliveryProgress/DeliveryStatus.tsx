import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useClientConfirmState } from "../../pages/ClientConfirmPage";
import { useEffect, useState } from "react";
import DeliveryTracker from "../DeliveryTracker";
import { create } from "zustand";
import Handler from "../../lib/Handler";
import { getOrder } from "../../utils/ExecuteOrderFromBlockchain";

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
  const [orderData, setOrderData] = useState({});

  const initalizeOrderData = async (orderNum: string | undefined) => {
    if (orderNum !== undefined) {
      const orderData = await getOrder(orderNum)
      setOrderData(orderData)
    }
  }

  const refreshQuickerLocation = async () => {
    // 지갑 주소를 이용하여 블록체인 데이터에서 상대 지갑 주소를 추출      
    
    // 값을 불러오는 fetch
    const response = await fetch(process.env.REACT_APP_SERVER_URL+`test`)
    const json = await response.json()

    // 해당 X,Y좌표를 수정
    setCoordiX(json.data.X);
    setCoordiY(json.data.Y);
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
      <DeliveryTracker mapHeight="45em" />
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
