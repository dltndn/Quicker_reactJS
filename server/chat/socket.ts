const SocketIo = require("socket.io");
import saveMessage from "../Mongo/Command/SaveMessage";
import { findMessage } from "../Mongo/Command/FindMessages";

import Caver from "caver-js";
import {
  QUICKER_DLVR_ADDRESS_KLAYTN,
  QUICKER_DLVR_ABI_KLAYTN,
} from "../klaytnApi/ContractInfo";

const env = process.env;
const chainId = 1001; // klaytn baobab network

const WS_URL = `wss://${env.KLAYTN_ACCESSKEY_ID}:${env.KLAYTN_SECRET_KEY}@node-api.klaytnapi.com/v1/ws/open?chain-id=${chainId}`;
const caver = new Caver(WS_URL);
// @ts-ignore
const qkrw_token_contract = caver.contract.create(QUICKER_DLVR_ABI_KLAYTN, QUICKER_DLVR_ADDRESS_KLAYTN);

const main = (server: any) => {
  const io = SocketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  try {
    // 임의의 채팅방 이름
    let roomName = "";
    // 이벤트 설정
    io.on("connect", async (socket: any) => {
      // 이벤트 관리
      socket.on("joinRoom", async (receiveRoomName: receiveRoomName) => {
        roomName = receiveRoomName.roomName;
        console.log("접속 방 이름 : ", receiveRoomName);
        socket.join(roomName);
        // db 내용 불러옴
        const messages = await findMessage(roomName);
        if (messages !== undefined) {
          socket.emit("loadMessage", messages);
        }
      });
      socket.on("sendMessage", (receiveMessage: Message, done: Function) => {
        // 해당 방에 전부 메세지 보냄
        // 메세지, 아이디, 시간 포함
        socket.to(roomName).emit("sendMessage", {
          id: receiveMessage.sender,
          message: receiveMessage.data,
          date: new Date().toISOString(),
        });
        console.log("현재 접속 방 정보 : ", roomName);
        console.log("수신 메세지 : ", receiveMessage.data);
        saveMessage({
          id: receiveMessage.sender,
          roomName: roomName,
          receiveMessage: receiveMessage.data,
        });
        done();
      });

      // Klaytn 블록체인 이벤트 리스너

      // const subscriptionId = await qkrw_token_contract.events
      //   .allEvents()
      //   .on("data", function (event: any) {
      //     switch(event.event) {
      //       case "OrderCreated" :
      //         console.log("orderNum: ", event.returnValues.orderNum)
      //         break;
      //       case "OrderResult" :
      //         console.log("result: ", event.returnValues.result)
      //         break;
      //       case "DepositedFee" :
      //         console.log("result: ", event.returnValues.result)
      //         break;
      //       case "ChangedBalance" :
      //         console.log("result: ", event.returnValues.result)
      //         break;
      //       case "AcceptedOrderNumber" :
      //         console.log("orderNum: ", event.returnValues.orderNum)
      //         break;
      //       case "deliveredOrderNumber" :
      //         console.log("orderNum: ", event.returnValues.orderNum)
      //         break;
      //       case "completedOrderNumber" :
      //         console.log("orderNum: ", event.returnValues.orderNum)
      //         break;
      //     }
      //   })
      //   .on("error", function (error: any) {
      //     console.error("Event error:", error);
      //     // 에러 처리 로직을 작성합니다.
      //   });

      // e
    });
  } catch (error) {
    console.error(error);
  }
};

interface Message {
  data: string;
  sender: string;
}

interface receiveRoomName {
  roomName: string;
}

export default main;
