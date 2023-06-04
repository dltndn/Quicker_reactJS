import {
    useContractWrite,
    usePrepareContractWrite,
  } from "wagmi";
  import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS } from "../contractInformation";
  import { useEffect, useState } from "react";
  import ConfirmBtn from "./confirmBtn";
  import { useOrderStore } from "../pages/commission";
  
  //Qkrw token contract information - polygon mumbai network
  const Quicker_abi = QUICKER_CONTRACT_ABI;
  const Quicker_address = QUICKER_ADDRESS;
  
  interface Props {
    _orderPrice: string;
    _deadLine: string;
  }
  
  export default function NewOrderTest({ _orderPrice, _deadLine }: Props) {
    const { btnContent } = useOrderStore()
  
    const { config } = usePrepareContractWrite({
      address: Quicker_address,
      abi: Quicker_abi,
      functionName: "createOrder",
      args: [_orderPrice, _deadLine],
    });
  
    const { isLoading, isSuccess, write } = useContractWrite({
      ...config,
      onError(error) {
        console.log(error);
      },
    });
  
    const createOrderLogic = () => {
      write?.()
    }
  
    useEffect(() => {
      console.log(isSuccess)
    }, [isSuccess])
  
    return (
      <>
        <button disabled={!write} onClick={() => createOrderLogic()}>
          오더생성하기
        </button>
        <br></br>
      </>
    );
  }
  
  // button에 ConfirmBtn 적용하기