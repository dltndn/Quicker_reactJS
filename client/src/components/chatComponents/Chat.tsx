import {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { socket } from "./socket";
import { useAccount } from "wagmi";
import { ChatInterface } from "./interface/ChatInterface";
import getName from "./getName";
import { getOrder } from "../../utils/ExecuteOrderFromBlockchain";
import Kakao from "../../lib/Kakao";
import Handler from "../../lib/Handler";
import { BsChatLeftDots, BsTelephone, BsStickies } from "react-icons/bs";

import { HiPaperAirplane } from "react-icons/hi2";
import styled from "styled-components";
import OtherMessageTemplate from "./OtherMessageTemplate";
import MyMessageTemplate from "./MyMessageTemplate";
import React from "react";
import TopBarChat from "../topBarChat";

import { MessageInfo } from "./interface/MessageInfo";
import { useNavigate } from "react-router-dom";

const Chatdot = require("../../image/Chatdot.png");
const Chatman = require("../../image/Chatman.png");

export default function ({
  role,
  roomName,
  realAddress,
  phoneNumbers,
}: ChatInterface) {
  const inputbox = useRef<HTMLInputElement>(null);

  const [messageData, setMessageData] = useState<MessageInfo[]>([])
  const [timeData, setTimeData] = useState<string[]>([])
  const [socketId, setSocketId] = useState<String>();
  const [opponentName, setOponentName] = useState<string>("");
  const [senderPhoneNumber, setSenderPhoneNumber] = useState();
  const [senderAddress, setSenderAddress] = useState();
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState();
  const [receiverAddress, setReceiverAddress] = useState();
  const [parsedAddress, setParsedAddress] = useState();

  const { address } = useAccount();

  // 이벤트 처리
  const addMessage = (messageInfo: MessageInfo) => {
    console.log(messageInfo);
    setMessageData((prevMessageData) => [...prevMessageData, messageInfo]);
  };

  // 메세지를 보내는 이벤트를 발생시킬때 DB에서 데이터를 가지고 오도록?
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("sendMessage", { data: inputbox.current!.value, sender: address }, () => {
      const message = inputbox.current!.value
      const id =  "" + address
      const date = new Date().toISOString()
      addMessage({id, date, message});
        inputbox.current!.value = "";
      }
    );
  };

  const joinRoom = (roomId: number) => {
    socket.emit("joinRoom", { roomName: roomId });
  };

  const loadMessages = (messages: MessageInfo[]) => {
    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
  
      const id = element.id
      const message = element.message
      const date = element.date
  
      addMessage({id, message, date});
    }
  };

  const getRealLocation = async (location: any) => {
    const realAddress = (await Kakao.reverseGeoCording(location.Y,location.X)) as any;
    if (realAddress !== undefined) {
      return realAddress.address_name;
    }
  };

  useEffect(() => {
    (async () => {
      if (roomName !== undefined && address !== undefined) {
        joinRoom(roomName);
        const blockChainOrder = await getOrder(String(roomName));
        getName({
          blockchainElement: blockChainOrder,
          address: address,
          setState: setOponentName,
        });
        const roomInfo = await Handler.post(
          { orderNum: roomName },
          process.env.REACT_APP_SERVER_URL + "getRoomInfo"
        );

        if (
          roomInfo.Recipient.PHONE !== undefined &&
          roomInfo.Recipient.PHONE !== null
        ) {
          setReceiverPhoneNumber(roomInfo.Recipient.PHONE);
        }
        if (
          roomInfo.Sender.PHONE !== undefined &&
          roomInfo.Sender.PHONE !== null
        ) {
          setSenderPhoneNumber(roomInfo.Sender.PHONE);
        }
        if (
          roomInfo.Recipient.Destination !== undefined &&
          roomInfo.Recipient.Destination !== null &&
          roomInfo.Sender.Departure !== undefined &&
          roomInfo.Sender.Departure !== null
        ) {
          const realDepartureAddress = await getRealLocation(
            roomInfo.Sender.Departure
          );
          const realDestinationAddress = await getRealLocation(
            roomInfo.Recipient.Destination
          );
          setSenderAddress(realDepartureAddress);
          setReceiverAddress(realDestinationAddress);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (opponentName !== "") {
      console.log(opponentName);
    }
  }, [opponentName]);

  useEffect(() => {
    socket.on("connect", () => setSocketId(socket.id));
    socket.on("joinRoom", joinRoom);
    socket.on("sendMessage", addMessage);
    socket.on("loadMessage", loadMessages);
  }, [socket]);

  useEffect(() => {
    if (socketId !== undefined) {
      console.log(socketId);
    }
  }, [socketId]);

  useEffect(() => {
    console.log(messageData)
  }, [messageData]);

  const navigate = useNavigate();

  return (
    <>
          <TopBarChat
        title={`${opponentName}`}
        role={`${role}`}
        redirectLogic={() => {
          navigate("/");
        }}
        ></TopBarChat>
      <Div0>
        <Div1>
          {receiverAddress}
          <Div2>
            <BsTelephone /> {receiverPhoneNumber} <BsStickies />
          </Div2>
        </Div1>
        <div>
          <Img1 src={Chatdot}></Img1>
        </div>
        <Div1>
          {senderAddress}{" "}
          <Div2>
            <BsTelephone /> {senderPhoneNumber} <BsStickies />
          </Div2>
        </Div1>
      </Div0>
      <>
      {/* address 타입 확인 필요 타입 변환 없이 string 타입으로 판별됨 */}
        {messageData.map((element: MessageInfo) => (
          (address === element.id) ? <MyMessageTemplate message={element.message} date={element.date} /> : <OtherMessageTemplate message={element.message} date={element.date} />
        ))}
      </>
      <form onSubmit={sendMessage} action="">
      <Sc0>
              <Divinput>
              <Ip1 ref={inputbox} placeholder="메세지 보내기"></Ip1>
              </Divinput>
              <Bt1 type="submit">
              <HiPaperAirplane />
            </Bt1>
        </Sc0>
        </form>
    </>
  );
}

const Div0 = styled.div`
  margin: 0px 10px 5px 10px;
  border-style: solid;
  border-color: #efefef;
  border-width: 0.5px 0px 0.5px 0px;
`;

const Div1 = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
`;

const Div2 = styled.div`
  font-size: 12px;
  font-weight: thin;
  color: #646464;
  margin: 5px 0 5px 0;
`;

const Img1 = styled.img`
  width: 4px;
  margin: -5px 0px -5px 90px;
`;

const Img2 = styled.img`
  width: 33px;
  height: 33px;
`;

const Div3 = styled.div`
  display: flex;
  margin: 10px 10px 10px 15px;
`;
const DivChat = styled.div`
  background-color: #f8f8f8;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0px 5px 0px 10px;
  padding: 8px;
`;
const Divclock = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 8px;
  font-weight: thin;
  color: #adadad;
`;

const Divdate = styled.div`
  width: 100%;
  margin: 10px 0 10px 0;
  display: flex;
  justify-content: center;
  font-size: 8px;
  font-weight: thin;
  color: #adadad;
`;
const Div4 = styled(Div3)`
  justify-content: flex-end;
`;

const DivChat2 = styled(DivChat)`
  background-color: #79afff;
  color: #ffffff;
`;

const Sc0 = styled.section`
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 3.875rem;
  background-color: var(--white-color);
  align-items: center;
  justify-content: space-around;
  text-align: center;
`;

const Ip1 = styled.input`
  border-radius: 20px;
  border: none;
  width: 90%;
  background-color: #e6e6e6;
  outline: none;
  height: 100%;
  color: #a0a0a0;
  padding-left: 15px;
`;

const Bt1 = styled.button`
  border: none;
  background-color: #ffffff;
  width: 30px;
  font-size: 20px;
  margin: 5px 10px 0 0 ;
`

const Divinput = styled.div`
  width: 85%;
  height: 30px;
`
