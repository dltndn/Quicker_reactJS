import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useClientConfirmState } from "../../pages/ClientConfirmPage";
import { useEffect } from "react";

interface DeliveryStatusProps extends ExecutionComponentProps {
  deadline: string;
}

export default function DeliveryStatus({
  orderNum,
  deadline,
}: DeliveryStatusProps) {
  const { setTitle } = useClientConfirmState();

  useEffect(() => {
    setTitle("배송현황");
  }, []);

  return (
    <>
      <div>픽업예정</div>
      <br />
      <div>{deadline}까지</div>
      <br />
      <div>실시간 배송원 위치 지도</div>
    </>
  );
}
