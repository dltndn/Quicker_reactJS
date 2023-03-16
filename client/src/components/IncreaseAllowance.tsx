import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { QKRW_CONTRACT_ABI, QKRW_ADDRESS, QUICKER_ADDRESS } from "../contractInformation";
import { useAccount } from "wagmi";

//Qkrw token contract information - polygon mumbai network
const Qkrw_abi = QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;
const Quicker_address = QUICKER_ADDRESS;

interface Props {
  setShowAllowance: () => void
}

export default function IncreaseAllowance( { setShowAllowance }: Props) {
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
          setShowAllowance()
        },
        onError(error) {
          console.log(error);
        },
      });
    return(<>
    <div>컨트랙에 QKRW토큰 전송 권한을 허용하는 과정이에요. 처음 한 번만 실행해요.</div>
    <button disabled={!write} onClick={() => write?.()}>
        확인
      </button>
      {isLoading && <div>서명을 요청 중이에요</div>}
    </>)
}