import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { QKRW_CONTRACT_ABI, QKRW_ADDRESS, QUICKER_ADDRESS } from "../contractInformation";
import { useAccount } from "wagmi";
import { useOrderStore } from "../pages/commission";
import styled from "styled-components";
import Lottie from "lottie-react";
import Done from "../Lottie/Done.json";

//Qkrw token contract information - polygon mumbai network
const Qkrw_abi = QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;
const Quicker_address = QUICKER_ADDRESS;

export default function IncreaseAllowance() {
  const {setShowAllowance} = useOrderStore()
  const { address } = useAccount();
    const { config } = usePrepareContractWrite({
        address: Qkrw_address,
        abi: Qkrw_abi,
        functionName: "increaseAllowance",
        args: [Quicker_address, "100000000000000000000000000"],
      });

      const { data, isLoading, isSuccess, write } = useContractWrite({
        ...config,
        onSuccess(data) {
          setShowAllowance(false)
        },
        onError(error) {
          console.log(error);
        },
      });
    return(<>
    <button onClick={() => setShowAllowance(false)}>test</button>
    <button disabled={!write} onClick={() => write?.()}>
        확인
      </button>
    <Div0>
      <Div1>
        컨트랙에 QKRW토큰 전송 권한을 허용하는 과정이에요. 처음 한 번만 실행해요.
      </Div1>
    </Div0>
      {isLoading && <Lottie animationData={Done}/>}
    </>)
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