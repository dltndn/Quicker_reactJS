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
  _orderPrice: string;
  _deadLine: string;
}

export default function CreateNewOrder({ _orderPrice, _deadLine }: Props) {
  const [createdOrder, setCreatedOrder] = useState<any>("오더 생성 전");

  const { config } = usePrepareContractWrite({
    address: Quicker_address,
    abi: Quicker_abi,
    functionName: "createOrder",
    args: [_orderPrice, _deadLine],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  useContractEvent({
    address: Quicker_address,
    abi: Quicker_abi,
    eventName: "OrderCreated",
    listener(node: any, label, owner) {
      let oNum = BigInt(node._hex).toString()
      setCreatedOrder(oNum)
    },
  });



  return (
    <>
      <button disabled={!write} onClick={() => write?.()}>
        오더생성하기
      </button>
      <br></br>
      <div>생성된 오더 번호: {createdOrder}</div><br></br>
    </>
  );
}
