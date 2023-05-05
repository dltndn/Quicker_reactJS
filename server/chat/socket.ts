import io from "./Config/SocketConnector";
import socketHandler from "./Controller/Handler";

const main = () => {
  // 임의의 채팅방 이름
  let roomName = "";
  
  // 이벤트 설정
  io.on("connect", (socket: any) => {
    socketHandler.printRoomInfo();
    // 방 입장
    // socket.join(roomName);
    // 이벤트 관리
    socket.on("joinRoom", (receiveRoomName: receiveRoomName, done : Function) => {
      roomName = receiveRoomName.roomName
      console.log("접속 방 이름 : ", receiveRoomName);
      console.log(roomName)
      done();
    });
    socket.on("sendMessage", socketHandler.sendMessage(socket, roomName));
    socket.on("disconnect", () => socketHandler.disconnect(socket));
  });

};
interface receiveRoomName {
  roomName : string
}

export = main;