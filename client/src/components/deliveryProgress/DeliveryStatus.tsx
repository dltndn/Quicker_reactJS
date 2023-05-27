import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useClientConfirmState } from "../../pages/ClientConfirmPage";
import { useEffect } from "react";
import DeliveryTracker from "../DeliveryTracker";
import { create } from "zustand";

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
  setCoordiX: (coordiX: number) => set({coordiX}),
  coordiY: null,
  setCoordiY: (coordiY: number) => set({coordiY}),
}));

export default function DeliveryStatus({
  orderNum,
  deadline,
}: DeliveryStatusProps) {
  const { setTitle } = useClientConfirmState();
  const { setCoordiX, setCoordiY } = useQuickerLocationState()

  useEffect(() => {
    setTitle("배송현황");
  }, []);

  return (
    <>
    <button onClick={() => {setCoordiX(126.92264); setCoordiY(37.58616);}}>배송원 위치 마커 버튼1</button>
    <button onClick={() => {setCoordiX(126.816911842685); setCoordiY(37.5336078354823);}}>배송원 위치 마커 버튼2</button>
      <div>픽업예정</div>
      <br />
      <div>{deadline}까지</div>
      <br />
      <DeliveryTracker mapHeight="45em"/>
    </>
  );
}
