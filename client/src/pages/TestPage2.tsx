import GetOrderContents from "../components/GetOrderContents";
import CreateNewOrder from "../components/createNewOrder";
import AcceptOrder from "../components/acceptOrder";
import CancelOrder from "../components/cancelOrder";
import { useState, useEffect } from "react";
import { useContractEvent } from "wagmi";
import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS } from "../contractInformation";

//Qkrw token contract information - polygon mumbai network
const Quicker_abi = QUICKER_CONTRACT_ABI;
const Quicker_address = QUICKER_ADDRESS;

export default function TestPage2() {
  const [orderNum, setOrderNum] = useState<string>("0");
  const [cancelNum, setCancelNum] = useState<string>("")
  const [orderPrice, setOrderPrice] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [acceptNum, setAcceptNum] = useState<string>("");

  const handleClick = (_orderNum:string) => {
    setOrderNum(_orderNum)
  };

  useContractEvent({
    address: Quicker_address,
    abi: Quicker_abi,
    eventName: "OrderResult",
    listener(node: any, label, owner) {
        alert("트랜잭션 성공!")
    },
  });

  return (
    <>
      <div>오더 생성하기(의뢰인)</div>
      <input
        placeholder="오더가격"
        value={orderPrice}
        onChange={(e) => setOrderPrice(e.target.value)}
      />
      <input
        placeholder="마감기한"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <CreateNewOrder _orderPrice={orderPrice} _deadLine={deadline} />
      <div>오더 취소하기(의뢰인)</div>
      <input
        placeholder="오더번호"
        value={cancelNum}
        onChange={(e) => setCancelNum(e.target.value)}
      />
      <CancelOrder _orderNumber={cancelNum} />
      <div>오더 수락하기(배송원)</div>
      <input
        placeholder="오더번호"
        value={acceptNum}
        onChange={(e) => setAcceptNum(e.target.value)}
      />
      <AcceptOrder _orderNumber={acceptNum} />
      <div>오더 조회하기</div>
      <input
        placeholder="오더번호"
        value={orderNum}
        onChange={(e) => handleClick(e.target.value)}
      />
      <br></br>
      <GetOrderContents orderNum={orderNum} />
    </>
  );
}
