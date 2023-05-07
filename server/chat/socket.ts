import io from "./Config/SocketConnector";
import socketHandler from "./Controller/Handler";
import mongoDB from "../models/mongo/mongo";
const main = () => {
  // 임의의 채팅방 이름
  let roomName = "";
  
  // 이벤트 설정
  io.on("connect", (socket: any) => {
    socketHandler.printRoomInfo();
    // 이벤트 관리
    socket.on("joinRoom", (receiveRoomName: receiveRoomName, done : Function) => {
      roomName = receiveRoomName.roomName
      console.log("접속 방 이름 : ", receiveRoomName);
      console.log(roomName)
      socket.join(roomName)
      done();
    });
    socket.on("sendMessage",(receiveMessage: Message, done : Function) => {
      console.log(roomName)
      // 해당 방에 전부 메세지 보냄
      socket.to(roomName).emit("sendMessage", receiveMessage.data);
      console.log("현재 접속 방 정보 : ", roomName)
      console.log("수신 메세지 : ", receiveMessage.data);
      mongoDB({id : receiveMessage.sender , roomName : roomName, receiveMessage : receiveMessage.data});
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