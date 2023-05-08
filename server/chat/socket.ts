import io from "./Config/SocketConnector";
import socketHandler from "./Controller/Handler";
import saveMessage from "../models/mongo/SaveMessage";
import findMessage from "../models/mongo/FindMessages";

const main = () => {
  // 임의의 채팅방 이름
  let roomName = "";

  // 이벤트 설정
  io.on("connect", (socket: any) => {
    socketHandler.printRoomInfo();
    // 이벤트 관리
    socket.on("joinRoom", async (receiveRoomName: receiveRoomName) => {
      roomName = receiveRoomName.roomName
      console.log("접속 방 이름 : ", receiveRoomName);
      socket.join(roomName)
      // db 내용 불러옴
      const messages = await findMessage(roomName)
      if (messages !== undefined) {
        socket.emit("loadMessage", messages);
      }
    });
    socket.on("sendMessage",(receiveMessage: Message, done : Function) => {
      // 해당 방에 전부 메세지 보냄
      socket.to(roomName).emit("sendMessage", receiveMessage.data);
      console.log("현재 접속 방 정보 : ", roomName)
      console.log("수신 메세지 : ", receiveMessage.data);
      saveMessage({id : receiveMessage.sender , roomName : roomName, receiveMessage : receiveMessage.data});
      done();
    },);
    socket.on("disconnect", () => socketHandler.disconnect(socket));
  });

};

interface Message {
  data: String;
  sender: String;
}

interface receiveRoomName {
  roomName : string
}

export = main;