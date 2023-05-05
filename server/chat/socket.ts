import express, { Application } from "express";
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

httpServer.listen(9001);

// 임의의 채팅방 이름
let roomName = "testroom";

const main = () => {
  // 이벤트 설정
  let sockets: Array<Object> = [];
  io.on("connect", (socket: any) => {
    console.log("연결됨");
    // socket 객체를 소켓 리스트에 저장
    sockets.push(socket);
    const count = io.engine.clientsCount;

    console.log("방 인원 수 : ", count);

    // 방 입장
    socket.join(roomName);

    // 메시지를 보내는 이벤트 발생
    socket.on("sendMessage", (message: MessageObejct, done: Function) => {
      // 해당 방에 전부 메세지 보냄
      socket.in(roomName).emit("sendMessage", message.data);
      console.log(message);

      console.log("수신 메세지 : ", message.data);
      done();
    });
    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("disconnected");
    });
  });
};

interface MessageObejct {
  data: String;
  sender: String;
}

export = main;
