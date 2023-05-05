import io from "./Config/SocketConnector";
import socketHandler from "./Controller/Handler";

// 임의의 채팅방 이름
const roomName = "testroom";

const main = () => {

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