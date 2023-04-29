import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useClientConfirmState } from "../../pages/ClientConfirmPage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmBtn from "../confirmBtn";
import { WriteTransactionToBlockchain } from "../../utils/ExecuteOrderFromBlockchain";

export default function CompletedOrderConfirm({
  orderNum,
}: ExecutionComponentProps) {
  const { setTitle } = useClientConfirmState();
  const navigate = useNavigate();

  const confirmLogic = async () => {
    if (orderNum !== undefined) {
      const wttb = new WriteTransactionToBlockchain(orderNum);
      try {
        const reult = await wttb.completeOrder();
        console.log(reult);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    setTitle("배송결과");
  }, []);

  return (
    <>
      <div>배송완료</div>
      <div>배송완료 애니메이션</div>
      <ConfirmBtn
        content="확인"
        confirmLogic={async () => {
          await confirmLogic();
        }}
      />
    </>
  );
}
