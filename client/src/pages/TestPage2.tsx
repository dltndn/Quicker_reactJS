import GetOrderContents from "../components/GetOrderContents";
import CreateNewOrder from "../components/createNewOrder";
import NewOrderTest from "../components/newOrderTest";
import styled from "styled-components";
import TransactOrder from "../components/transactOrder";
import { useState, useEffect } from "react";
import { useContractEvent, useTransaction, useAccount } from "wagmi";
import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS } from "../contractInformation";
import { getOrdersForState } from "../utils/ExecuteOrderFromBlockchain";
import { SendDataToAndroid } from "../utils/SendDataToAndroid";

//Qkrw token contract information - polygon mumbai network
const Quicker_abi = QUICKER_CONTRACT_ABI;
const Quicker_address = QUICKER_ADDRESS;

export default function TestPage2() {
  const [orderNum, setOrderNum] = useState<string>("");
  const [orderPrice, setOrderPrice] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [txSender, setTxSender] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")

  const { address } = useAccount()

  const handleClick = (_orderNum: string) => {
    setOrderNum(_orderNum);
  };

  useContractEvent({
    address: Quicker_address,
    abi: Quicker_abi,
    eventName: "OrderResult",
    async listener(node: any, label: any, owner) {
      let resTx = await label.getTransactionReceipt()
      if(txHash !== resTx.transactionHash) {
        setTxHash(resTx.transactionHash)
        setTxSender(resTx.from)
        if(address === txSender){
          alert("트랜잭션 성공!")
        } else {
          console.log("다른 트랜잭션")
        }
      }
    },
  });

  // 오더 상태별 오더 데이터들 배열로 반환
//     created -> 0
//     matched -> 1
//     completed -> 2
//     failed -> 3
//     canceled -> 4
  const getOrdersForStateTest = async (_state: number) => {
    const result = await getOrdersForState(_state)
    console.log(result)
  }

 const KakaoMapDeepLinkButton = () => {
    const executeMap = (isUsingCurrent : boolean) => {
        const sdta = new SendDataToAndroid("")
        
        // @ts-ignore
        sdta.openMapApp("37.45265062424184", "126.78840727356301", "경기 시흥시 대야동 303-75", "37.48999816930172", "126.77896203089682", "경기 부천시 심곡동 424", isUsingCurrent, 2)
        // ex) lat : 37.464, lng : 126.9522394
        // sdta.openMapApp("126.78840727356301", "37.45265062424184", "경기 시흥시 대야동 303-75", "126.77896203089682", "37.48999816930172", "경기 부천시 심곡동 424", isUsingCurrent, 2)
    }
    return <button onClick={() => executeMap(false)}> kakao map btn</button>
}
  return (
    <>
      <TopDiv>
        <KakaoMapDeepLinkButton />
        <div>
          <button onClick={() => getOrdersForStateTest(1)}>매칭 이후 오더들 불러오는 버튼</button>
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
          <NewOrderTest _orderPrice={orderPrice} _deadLine={deadline} />
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
