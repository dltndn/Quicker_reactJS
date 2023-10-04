/* eslint-disable import/no-anonymous-default-export */
import {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { socket } from "./socket";
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
import { useConnWalletInfo } from "../../App";

import { MessageInfo } from "./interface/MessageInfo";
import { useNavigate } from "react-router-dom";
import { ChatStyle } from "../../StyleCollection";

import { getNftImgPath } from "../../utils/CalAny";

const {Div0, Div1, Div2, Divinput, Img1, Ip1, Sc0, Bt1} = new ChatStyle()


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
  const [socketId, setSocketId] = useState<String>();
  const [opponentName, setOponentName] = useState<string>("");
  const [senderPhoneNumber, setSenderPhoneNumber] = useState();
  const [senderAddress, setSenderAddress] = useState();
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState();
  const [receiverAddress, setReceiverAddress] = useState();
  const [nftId, setNftId] = useState<string>('404')

  const { address } = useConnWalletInfo();

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
        const roomInfo = await Handler.get(
          process.env.REACT_APP_SERVER_URL + `room/?orderNum=${roomName}`
        );
        console.log(roomInfo)

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
        let oponentAddress = ''
        if (address === blockChainOrder?.client) {
          // 계정 주인이 의뢰인 즉 상대방은 배송원
          oponentAddress = blockChainOrder.quicker
        } else {
          // 계정 주인이 배송원 즉 상대방은 의뢰인
          oponentAddress = blockChainOrder?.client
        }
        console.log(oponentAddress)
        const { imageId } = await Handler.get(`${process.env.REACT_APP_SERVER_URL}user/image/id/?walletAddress=${oponentAddress}`)
        console.log(imageId)
        setNftId(imageId)
      }
    })();
    return () => {
      setNftId('404')
    }
  }, []);

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
          (address === element.id) ? <MyMessageTemplate message={element.message} date={element.date} /> : <OtherMessageTemplate message={element.message} date={element.date} nftImgPath={getNftImgPath(nftId)}/>
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

