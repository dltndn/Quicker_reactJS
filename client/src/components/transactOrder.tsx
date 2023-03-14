import {
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS } from "../contractInformation";
import { useEffect, useState } from "react";

//Qkrw token contract information - polygon mumbai network
const Quicker_abi = QUICKER_CONTRACT_ABI;
const Quicker_address = QUICKER_ADDRESS;

interface Props {
  _functionName: string;
  title: string;
}

interface ErrorProps {
  reason: string;
}

export default function TransactOrder({
  _functionName,
  title,
}: Props) {
    const [orderNum, setOrderNum] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()

  const { config } = usePrepareContractWrite({
    address: Quicker_address,
    abi: Quicker_abi,
    functionName: _functionName,
    args: [orderNum],
    onSettled(data: any, error: any) {
      let result: ErrorProps = JSON.parse(JSON.stringify(error))
      setErrorMessage(result.reason)
    },

  });

  const { error, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <>
      <div>{title}</div>
      <input
        placeholder="오더번호"
        value={orderNum}
        onChange={(e) => setOrderNum(e.target.value)}
      />
      <button disabled={!write} onClick={() => write?.()}>
        확인
      </button>
      {isLoading && <div>지갑 서명 대기중...</div>}
      {isSuccess && <div>트랜잭션 전송 완료</div>}
      {errorMessage && <div>에러: {errorMessage}</div>}
      <div></div>
      <br></br>
    </>
  );
}
