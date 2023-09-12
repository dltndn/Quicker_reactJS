import { useOrderStore } from "../pages/commission";
import styled from "styled-components";
import Lottie from "lottie-react";
import Done from "../Lottie/Done.json";
import SendTxK from "./blockChainTx/SendTxK";
import GetContractParams from "./blockChainTx/GetContractParams";
import { useConnWalletInfo } from "../App";



export default function IncreaseQAllowance() {
  const { setShowAllowance } = useOrderStore();
  const { address } = useConnWalletInfo();
  const onSuccess = () => {
    setShowAllowance(false);
  };
  return (
    <>
      <Div0>
        <Lottie animationData={Done} />
        <Div1>
          컨트랙에 Quicker토큰 전송 권한을 허용하는 과정이에요. 처음 한 번만
          실행해요.
        </Div1>
      </Div0>
      {address === undefined ? (
        <>지갑 연결 해제됨</>
      ) : (
        <Margin_1>
        <SendTxK
          param={GetContractParams.increaseAllowanceQuicker_staking()}
          successFunc={onSuccess}
        />
        </Margin_1>
      )}
    </>
  );
}

const Div0 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const Div1 = styled.div`
  margin-top: 20px;
  font-size: var(--font-micro);
  color: #828282;
`;
const Margin_1 = styled.section`
  position: fixed;
  bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`