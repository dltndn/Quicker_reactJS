import GetOrderContents from "../components/GetOrderContents";
import CreateNewOrder from "../components/createNewOrder";
import styled from "styled-components";
import TransactOrder from "../components/transactOrder";
import { useState, useEffect } from "react";
import { useContractEvent } from "wagmi";
import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS } from "../contractInformation";

//Qkrw token contract information - polygon mumbai network
const Quicker_abi = QUICKER_CONTRACT_ABI;
const Quicker_address = QUICKER_ADDRESS;

export default function TestPage2() {
  const [orderNum, setOrderNum] = useState<string>("");
  const [cancelNum, setCancelNum] = useState<string>("");
  const [orderPrice, setOrderPrice] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [acceptNum, setAcceptNum] = useState<string>("");

  const handleClick = (_orderNum: string) => {
    setOrderNum(_orderNum);
  };

  useContractEvent({
    address: Quicker_address,
    abi: Quicker_abi,
    eventName: "OrderResult",
    listener(node: any, label, owner) {
      alert("트랜잭션 성공!");
    },
  });

  return (
    <>
      <TopDiv>
        <div>
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
          <TransactOrder
            _functionName="cancelOrder"
            title="오더 취소하기(의뢰인)"
          />
          <TransactOrder
            _functionName="acceptOrder"
            title="오더 수락하기(배송원)"
          />
          <TransactOrder
            _functionName="deliveredOrder"
            title="배송 완료하기(배송원)"
          />
          <TransactOrder
            _functionName="completeOrder"
            title="계약 완료하기(의뢰인)"
          />
          <TransactOrder
            _functionName="withdrawFromOrder"
            title="수익금 정산하기(배송원)"
          />
          <TransactOrder
            _functionName="failedOrder"
            title="실패 오더 환불받기(의뢰인)"
          />
        </div>
        <div>
          <div>오더 조회하기</div>
          <input
            placeholder="오더번호"
            value={orderNum}
            onChange={(e) => handleClick(e.target.value)}
          />
          <br></br>
          <GetOrderContents orderNum={orderNum} />
        </div>
      </TopDiv>
    </>
  );
}

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
