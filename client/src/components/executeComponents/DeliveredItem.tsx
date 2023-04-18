import ConfirmBtn from "../confirmBtn";
import { useState, useEffect } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import FaceToFaceDelivery from "./FaceToFaceDelivery";
import RemoteDelivery from "./RemoteDelivery";
import styled from "styled-components";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { WriteTransactionToBlockchain } from "../../utils/ExecuteOrderFromBlockchain";

const Div0 = styled.div`
  display: flex;
  height: 3.875rem;
`;

const Div1 = styled.div`
  flex: 1 1 50%;
`;

const Btwal = styled.button`
  width: 100%;
  height: 2.25rem;
  font-size: var(--font-md1);
  font-weight: bold;

  border: 0rem;
  outline: #efefef;
  background-color: #ffffff;
  padding-left: 0.625rem;
  text-align: center;

  &:focus {
    border-bottom: 0.125rem solid #0070f3;
  }
`;

export default function DeliveredItem({ orderNum }: ExecutionComponentProps) {
  const { setTitle, setShowComponent } = useExecutionState();
  const [isFace, setIsFace] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const confirmLogic = async () => {
    if (orderNum !== undefined) {
        const wttb = new WriteTransactionToBlockchain(orderNum)
        try {
            const result = await wttb.deliveredOrder()
            console.log(result)
            // 배송원 사진 업로드 로직 작성
        } catch(e) {
            console.log(e)
        }
    }
    setIsConfirm(true)
  };

  useEffect(() => {
    setTitle("물품전달");
  }, []);

  return (
    <>
      {!isConfirm ? (
        <>
          <Div0>
            <Div1>
              <Btwal onClick={() => setIsFace(true)}>대면</Btwal>
            </Div1>
            <Div1>
              <Btwal onClick={() => setIsFace(false)}>비대면</Btwal>
            </Div1>
          </Div0>
          {isFace ? <FaceToFaceDelivery /> : <RemoteDelivery />}
          <ConfirmBtn
            content="확인"
            confirmLogic={() => {
              confirmLogic();
            }}
          />
        </>
      ) : (
        <><div>수취인 및 의뢰인이 확인중입니다...</div></>
      )}
    </>
  );
}
