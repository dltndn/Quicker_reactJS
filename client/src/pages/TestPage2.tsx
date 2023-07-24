// import GetOrderContents from "../components/GetOrderContents";
import CreateNewOrder from "../components/createNewOrder";
// import NewOrderTest from "../components/newOrderTest";
import styled from "styled-components";
// import TransactOrder from "../components/transactOrder";
import { useState, useEffect } from "react";
import { useContractEvent, useTransaction, useAccount } from "wagmi";
// import { QUICKER_CONTRACT_ABI, QUICKER_ADDRESS, QUICKER_DLVR_ABI_KLAYTN, QUICKER_DLVR_ADDRESS_KLAYTN } from "../contractInformation";
import { getOrdersForState } from "../utils/ExecuteOrderFromBlockchain";
import { SendDataToAndroid } from "../utils/SendDataToAndroid";

import WalletConnectBtn from "../components/blockChainTx/WalletConnectBtn";
import SendTxK from "../components/blockChainTx/SendTxK";

import { getAllowance } from "../utils/ExecuteOrderFromBlockchain";
import { useConnWalletInfo } from "../App";
import GetContractParams from "../components/blockChainTx/GetContractParams";
import { getQkrwBalance } from "../utils/ExecuteOrderFromBlockchain";
import { getOrders } from "../utils/ExecuteOrderFromBlockchain";
import {
  prepare,
  request as klipRequest,
  getResult as getKlipResult,
  //@ts-ignore
} from "klip-sdk";
import { KlipSdk } from "../utils/KlipSdk";
import { KaikasConnect } from "../utils/KaikasConnect";
import { changeBalanceToForm } from "../utils/CalAny";
import axios from "axios";

// socket test
import { socket } from "../components/chatComponents/socket";

var QRCode = require('qrcode')

//Qkrw token contract information - polygon mumbai network
// const Quicker_abi = QUICKER_CONTRACT_ABI;
// const Quicker_address = QUICKER_ADDRESS;

export default function TestPage2() {
  const [orderNum, setOrderNum] = useState<string>("");
  const [orderPrice, setOrderPrice] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [txSender, setTxSender] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")

  const { address } = useConnWalletInfo()

  const handleClick = (_orderNum: string) => {
    setOrderNum(_orderNum);
  };


  // useContractEvent({
  //   address: Quicker_address,
  //   abi: Quicker_abi,
  //   eventName: "OrderResult",
  //   async listener(node: any, label: any, owner) {
  //     let resTx = await label.getTransactionReceipt()
  //     if(txHash !== resTx.transactionHash) {
  //       setTxHash(resTx.transactionHash)
  //       setTxSender(resTx.from)
  //       if(address === txSender){
  //         alert("트랜잭션 성공!")
  //       } else {
  //         console.log("다른 트랜잭션")
  //       }
  //     }
  //   },
  // });

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

// klip test

const kSdk = new KlipSdk()
const getReqkey = async() => {
  const req_key = await kSdk.getKlipReqKeySendToken('', "0.1")
  setReqKey(req_key)
}
const sendKlay = async () => {
  const txHash = await kSdk.getTxHash(reqKey)

}
//

// Kaikas test
const [reqKey, setReqKey] = useState<string>("")
const [klaytnAddr, setKlaytnAddr] = useState<unknown>("")
const kConn = new KaikasConnect()
const getReqKey2 = async () => {
  const req_key = await kConn.getKaikasReqKeyAuth()
  setReqKey(req_key)
}

const getAddress = async () => {
  const addr = await kConn.getAddress(reqKey, true)
  setKlaytnAddr(addr)
}
//

const allowanceTest = async () => {
  try {
    const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}caver/getCommissionRate`);
    console.log(data.data)
  } catch (e) {
    console.log(e)
  }
}

// socket test
// const [socketId, setSocketId] = useState<string>()
// useEffect(() => {
//   // socket.on("connect", () => setSocketId(socket.id))
//   console.log("???")
// }, [socket])

// useEffect(() => {
//   if(socketId !== undefined) {
//     console.log(socketId)
//   }
// }, [socketId])

  return (
    <>
      {klaytnAddr}
      <TopDiv>
        <KakaoMapDeepLinkButton />
        <div>
          <button onClick={() => getOrdersForStateTest(1)}>매칭 이후 오더들 불러오는 버튼</button>
          {/* <button onClick={async () => await getKlipAddress()}>클립 지갑주소 테스트</button> */}
          <WalletConnectBtn />
          <button onClick={async() => await getReqKey2()}>kaikas req key</button>
          <button onClick={async() => await getAddress()}>kaikas address</button>
          {/* <SendTxK recieverAddress={""} amm={10}/> */}
          <SendTxK param={GetContractParams.IncreaseAllowanceQkrw()} successFunc={() => console.log("success func")}/>
          <button onClick={async() => await allowanceTest()}>get owner</button>
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
          {/* <NewOrderTest _orderPrice={orderPrice} _deadLine={deadline} />
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
          /> */}
        </div>
        <div>
          <div>오더 조회하기</div>
          <input
            placeholder="오더번호"
            value={orderNum}
            onChange={(e) => handleClick(e.target.value)}
          />
          <br></br>
          {/* <GetOrderContents orderNum={orderNum} /> */}
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
