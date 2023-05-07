import { useState, useEffect, useRef, ReactNode } from "react";
import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import Chat from "../components/chat";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { getOrderList, getOrders } from "../utils/ExecuteOrderFromBlockchain";
import { useAccount } from "wagmi";
import Room from "../components/Room";

const nochat = require('../image/nochat.png');

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

const Div0 = styled.div`
  display:flex;
  justify-content: center;
  flex-direction:column;
  text-align:center;
`;

const Img = styled.img`
  margin-top: 30%;
  margin-left: 10%;
  height: 140px;
  width: 140px;
  
`;

const Div1 = styled.div`
  margin-top: 20px;
  font-size: var(--font-micro);
  color: #828282;
`;

function ChattingPage() {
  const navigate = useNavigate()
  
  const { address, isConnected } = useAccount();

  const [blockChainData, setBlockChainData] = useState<any>();
  const [combinedBlockChainData, setCombinedBlockChainData] = useState<ReactNode[] | undefined>();

  const combineClientDeliverOrderList = (clientOrderList : string[] | undefined, deliverOrderList : string[]| undefined) => {
    
    if((clientOrderList && deliverOrderList) === undefined) return
    else if(clientOrderList === undefined) return deliverOrderList?.map(Number)
    else if (deliverOrderList === undefined) return clientOrderList?.map(Number)
    else {
      const parsedIntClientOrderList = clientOrderList?.map(Number)
      const parsedIntDeliverOrderList = deliverOrderList?.map(Number)
      console.log(parsedIntClientOrderList, parsedIntDeliverOrderList)
      let clientIndex = 0;
      let deliverIndex = 0;
      const list = []
      for (let index = 0; index < parsedIntClientOrderList.length + parsedIntDeliverOrderList.length; index++) {
        if(parsedIntClientOrderList[clientIndex] === undefined) {
          list.unshift(parsedIntDeliverOrderList[deliverIndex])
          deliverIndex++;
        } else if (parsedIntDeliverOrderList[deliverIndex] === undefined) {
          list.unshift(parsedIntClientOrderList[clientIndex])
          clientIndex++;
        } else if(parsedIntClientOrderList[clientIndex] > parsedIntDeliverOrderList[deliverIndex]){ 
          list.unshift(parsedIntDeliverOrderList[deliverIndex])
          deliverIndex++
        } else {
          list.unshift(parsedIntClientOrderList[clientIndex])
          clientIndex++
        }
      }

      return list
    }
  }

  const getOrderListFromBlochain = async () => {
    const clientOrderList = await getOrderList(address, true);
    const deliverOrderList = await getOrderList(address, false);
 
    const list = combineClientDeliverOrderList(clientOrderList,deliverOrderList);
    console.log(list)
    setBlockChainData(list)
  };

  useEffect(() => {
    getOrderListFromBlochain()
  }, []);

  useEffect(() => {
    if (blockChainData !== undefined) {
      (async () => {
        let combineData = await getOrders(blockChainData)
        setCombinedBlockChainData(combineData);
      })()
    }
  }, [blockChainData]);
  return (
    <>
      <GlobalStyle />
      <TopBarOthers title="채팅" redirectLogic={() => {
        navigate("/")
      }}></TopBarOthers>
      <Div0 className="App">
        {
          (combinedBlockChainData !== undefined) ?
            combinedBlockChainData.map((data: any) => {
              return (<Room roomData={data} ></Room>)
            }) :
            <div>
              <div>
                <Img src={nochat} />
              </div>
              <Div1>현재 진행 중인 채팅이 없습니다.<br></br>
                거래를 시작하여 채팅을 활성화 시켜보세요!</Div1>
            </div>
        }
      </Div0>
      <BottomBar></BottomBar>
    </>
  );
}

export default ChattingPage;