import { useState, useEffect, useRef, ReactNode } from "react";
import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { getOrderList, getOrders, getOrdersForState } from "../utils/ExecuteOrderFromBlockchain";
import { useAccount } from "wagmi";
import Room from "../components/chatComponents/Room";
import Chat from "../components/chatComponents/Chat";



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
  
  const [isRoomClicked, setIsRoomClicked] = useState<boolean>(false);
  const [selectedOrderNum, setSelectedOrderNum] = useState<number | undefined>(undefined);
  const [blockChainData, setBlockChainData] = useState<any>();
  const [combinedBlockChainData, setCombinedBlockChainData] = useState<ReactNode[] | undefined>();

  const getOrderListFromBlochain = async () => {
    const result = await getOrdersForState(1).then(list => list.reverse())
    console.log(result)
    setBlockChainData(result)
  };

  useEffect(() => {
    getOrderListFromBlochain()
  }, []);

// state 값 확인 용
  useEffect(() => {
    if ((selectedOrderNum) !== undefined) {
      console.log(isRoomClicked)
      console.log(selectedOrderNum)
    }
  }, [isRoomClicked, selectedOrderNum]);

  useEffect(() => {
    if (blockChainData !== undefined) {
      (async () => {
        setCombinedBlockChainData(blockChainData);
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
        {((isRoomClicked === true) && (selectedOrderNum !== undefined)) ? 
          (<Chat roomName={selectedOrderNum} realAddress={{receiver : "수취인 주소", sender : "발송인 주소"}} phoneNumbers={{receiver : "수취인 번호", sender : "발송인 번호"}} />) :
          ((combinedBlockChainData !== undefined) ?
            combinedBlockChainData.map((blockchainElement: any) => {
              let orderNum = parseInt(blockchainElement.orderNum)
              return (<Room setStates={{ setSelectedOrderNum: setSelectedOrderNum, setIsRoomClicked: setIsRoomClicked }} orderNum={orderNum} blockchainElement={blockchainElement}></Room>)
            }) :
            <div>
              <div>
                <Img src={nochat} />
              </div>
              <Div1>현재 진행 중인 채팅이 없습니다.<br></br>
                거래를 시작하여 채팅을 활성화 시켜보세요!</Div1>
            </div>)
        }
      </Div0>
      <BottomBar></BottomBar>
    </>
  );
}


export default ChattingPage;