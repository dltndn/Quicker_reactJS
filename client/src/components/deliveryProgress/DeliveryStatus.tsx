import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useClientConfirmState } from "../../pages/ClientConfirmPage";
import { useEffect } from "react";
import DeliveryTracker from "../DeliveryTracker";
import { create } from "zustand";
import styled from "styled-components";

interface DeliveryStatusProps extends ExecutionComponentProps {
  deadline: string;
}

interface QuickerLocationState {
  coordiX: number | null;
  setCoordiX: (data: number) => void;
  coordiY: number | null;
  setCoordiY: (data: number) => void;
}

export const useQuickerLocationState = create<QuickerLocationState>((set) => ({
  coordiX: null,
  setCoordiX: (coordiX: number) => set({ coordiX }),
  coordiY: null,
  setCoordiY: (coordiY: number) => set({ coordiY }),
}));

export default function DeliveryStatus({orderNum, deadline}: DeliveryStatusProps) {
  const { setTitle } = useClientConfirmState();
  const { setCoordiX, setCoordiY } = useQuickerLocationState();

  const getDeliverLocation = () => {
    setCoordiX(126.82);
    setCoordiY(37.534);
  }

  const refreshQuickerLocation = (orderNum: string | undefined) => {
    if (orderNum !== undefined) {
      // orderNum로 배송원 위치 좌표 가져오기
      // setCoordiX(126.42264);
      // setCoordiY(37.38616);
    }
    // 테스트 코드
    getDeliverLocation();
  };

  useEffect(() => {
    setTitle("배송현황");
  }, []);

  return (
    <>
      {/* <button
        onClick={() => getDeliverLocation}
      >
        배송원 위치 마커 버튼1
      </button>
      <button
        onClick={() => {
          setCoordiX(126.816911842685);
          setCoordiY(37.5336078354823);
        }}
      >
        배송원 위치 마커 버튼2
      </button>
      <button
        onClick={() => {
          
        }}
      >
        배송원 위치 마커 버튼3
      </button> */}
      <div>픽업예정</div>
      <br />
      <div>{deadline}까지</div>
      <br />
      <DeliveryTracker mapHeight="45em" />
      <button
        onClick={() => refreshQuickerLocation(orderNum || undefined)}
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
