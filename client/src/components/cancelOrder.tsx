import {
    useContractWrite,
    usePrepareContractWrite,
    useContractEvent,
  } from "wagmi";
  import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS } from "../contractInformation";
  import { useEffect, useState } from "react";
  
  //Qkrw token contract information - polygon mumbai network
  const Quicker_abi = QUICKER_CONTRACT_ABI;
  const Quicker_address = QUICKER_ADDRESS;
  
  interface Props {
    _orderNumber: string;
  }
  
  export default function CancelOrder({ _orderNumber }: Props) {
    const { config } = usePrepareContractWrite({
      address: Quicker_address,
      abi: Quicker_abi,
      functionName: "cancelOrder",
      args: [_orderNumber],
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
        <button disabled={!write} onClick={() => write?.()}>
          오더취소하기
        </button>
        {isLoading && <div>지갑 서명 대기중...</div>}
        {isSuccess && <div>트랜잭션 전송 완료</div>}
        <div></div><br></br>
      </>
    );
  }
  