import io from "../Config/SocketController";

const socketHandler = {

  printRoomInfo : () => {
    console.log("연결됨");
    const count = io.engine.clientsCount;
    console.log("방 인원 수 : ", count);
  },

  disconnect: (socket: any) => {
    socket.disconnect();
    console.log("disconnected");
  },

  sendMessage: (socket: any, roomName: string) => (receiveMessage: Message) => {
    // 해당 방에 전부 메세지 보냄
    socket.in(roomName).emit("sendMessage", receiveMessage.data);
    console.log(receiveMessage);

    console.log("수신 메세지 : ", receiveMessage.data);
  },
};

interface Message {
  data: String;
  sender: String;
}

export = socketHandler;