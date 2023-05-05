import io from "./Config/SocketController";
import socketHandler from "./Controller/Handler";



const roomName = "testroom";

const main = () => {
  // 임의의 채팅방 이름

  // 이벤트 설정
  io.on("connect", (socket: any) => {
    socketHandler.printRoomInfo();
    // 방 입장
    socket.join(roomName);
    // 이벤트 관리
    socket.on("sendMessage", socketHandler.sendMessage(socket, roomName));
    socket.on("disconnect", () => socketHandler.disconnect(socket));
  });
};



export = main;
