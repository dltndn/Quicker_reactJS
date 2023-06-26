import { useState, useEffect, useRef, ReactNode } from "react";
import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import {
  getOrderList,
  getOrders,
  getOrdersForState,
} from "../utils/ExecuteOrderFromBlockchain";
import { useAccount } from "wagmi";
import Room from "../components/chatComponents/Room";
import Chat from "../components/chatComponents/Chat";
import delelteDoubleQuote from "../lib/DeleteDoubleQuote";

const nochat = require("../image/nochat.png");

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff !important;
    height: 100%;
  }
`;

const Div0 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div3 = styled.div`
  justify-content: center;
  text-align: center;
`

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

const isMyOrder = (element: any, address: string) => {
  const clientWalletAddress = delelteDoubleQuote(element.client);
  const quickerWalletAddress = delelteDoubleQuote(element.quicker);
  if (clientWalletAddress === address || quickerWalletAddress === address)
    return true;
  else return false;
};

const filterNotMyOrder = (list: any[], address: string) => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (isMyOrder(element, address)) {
    } else {
      list.splice(index, 1);
      index--;
    }
  }
  return list;
};

function ChattingPage() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [isRoomClicked, setIsRoomClicked] = useState<boolean>(false);
  const [selectedOrderNum, setSelectedOrderNum] = useState<number | undefined>(
    undefined
  );
  const [blockChainData, setBlockChainData] = useState<any>();
  const [combinedBlockChainData, setCombinedBlockChainData] = useState<
    ReactNode[] | undefined
  >();

  const getOrderListFromBlochain = async () => {
    const blockChainDataList = await getOrdersForState(1).then((list) =>
      list.reverse()
    );
    if (address !== undefined) {
      const filteredOrders = filterNotMyOrder(blockChainDataList, address);
      setBlockChainData(filteredOrders);
    }
  };

  useEffect(() => {
    getOrderListFromBlochain();
  }, []);

  // state 값 확인 용
  useEffect(() => {
    if (selectedOrderNum !== undefined) {
      console.log(isRoomClicked);
      console.log(selectedOrderNum);
    }
  }, [isRoomClicked, selectedOrderNum]);

  useEffect(() => {
    if (blockChainData !== undefined) {
      (async () => {
        setCombinedBlockChainData(blockChainData);
      })();
    }
  }, [blockChainData]);
  return (
    <>
      <GlobalStyle />
      <TopBarOthers
        title="채팅"
        redirectLogic={() => {
          navigate("/");
        }}
      ></TopBarOthers>
      <Div0 className="App">
        {isRoomClicked === true && selectedOrderNum !== undefined ? (
          <Chat
            roomName={selectedOrderNum}
            realAddress={{ receiver: "수취인 주소", sender: "발송인 주소" }}
            phoneNumbers={{ receiver: "수취인 번호", sender: "발송인 번호" }}
          />
        ) : combinedBlockChainData !== undefined ? (
          combinedBlockChainData.map((blockchainElement: any) => {
            let role = ""
            console.log(blockchainElement)
            if (address === delelteDoubleQuote(blockchainElement.client)) {
              // 계정 주인이 의뢰인 즉 상대방은 배송원
              role = "배송원"
            } else {
              // 계정 주인이 배송원 즉 상대방은 의뢰인
              role = "의뢰인"
            }
            let orderNum = parseInt(blockchainElement.orderNum);
            return (
              <Room
                setStates={{
                  setSelectedOrderNum: setSelectedOrderNum,
                  setIsRoomClicked: setIsRoomClicked,
                }}
                orderNum={orderNum}
                role={role}
                blockchainElement={blockchainElement}
              ></Room>
            );
          })
        ) : (
          <Div3>
            <div>
              <Img src={nochat} />
            </div>
            <Div1>
              현재 진행 중인 채팅이 없습니다.<br></br>
              거래를 시작하여 채팅을 활성화 시켜보세요!
            </Div1>
          </Div3>
        )}
      </Div0>
      {isRoomClicked === true && selectedOrderNum !== undefined ? (<></>):(<BottomBar></BottomBar>)}
    </>
  );
}

export default ChattingPage;
