import { useOrderStore } from "../pages/commission";
import styled from "styled-components";
import Lottie from "lottie-react";
import Done from "../Lottie/Done.json";
import SendTxK from "./blockChainTx/SendTxK";
import GetContractParams from "./blockChainTx/GetContractParams";
import { useConnWalletInfo } from "../App";
import { InceraseAllowanceStyle } from "../StyleCollection";

const {Div0, Div1, Margin_1} = new InceraseAllowanceStyle()

export default function IncreaseAllowance() {
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
          컨트랙에 QKRW토큰 전송 권한을 허용하는 과정이에요. 처음 한 번만
          실행해요.
        </Div1>
      </Div0>
      {address === undefined ? (
        <>지갑 연결 해제됨</>
      ) : (
        <Margin_1>
        <SendTxK
          param={GetContractParams.IncreaseAllowanceQkrw()}
          successFunc={onSuccess}
        />
        </Margin_1>
      )}
    </>
  );
}

