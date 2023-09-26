import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useClientConfirmState } from "../../pages/ClientConfirmPage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Lottie from "lottie-react";
import OrderDelivery from "../../Lottie/89626-order-delivery.json";
import SendTxK from "../blockChainTx/SendTxK";
import GetContractParams from "../blockChainTx/GetContractParams";
import { CompletedOrderStyle } from "../../StyleCollection";

const {Div0, Div1, Div2, Div3, Div4, Mg0, Sp0, Btwal, Divback} = new CompletedOrderStyle()

const GlobalStyle = createGlobalStyle`
body {
  background-color: #e6e6e6 !important;
  height: 100%;
}
`;

export default function CompletedOrderConfirm({
  orderNum,
}: ExecutionComponentProps) {
  const { setTitle } = useClientConfirmState();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("배송결과");
  }, []);

  return (
    <>
<GlobalStyle/>
        <Div0>
            <Div1>
            <Btwal>배송완료</Btwal> 
            </Div1>
        </Div0>
        <Divback>
            <Div2>
                <Lottie animationData={OrderDelivery}/>
            </Div2>
        </Divback>
        <Div3>
        <Div4>
            <Sp0>
              배송이 완료되었습니다.
            </Sp0>
        </Div4>
        </Div3>
        
        {orderNum && <Mg0><SendTxK param={GetContractParams.CompleteOrder(orderNum)} successFunc={() => navigate("/")}/> </Mg0>}
    </>
  );
}

