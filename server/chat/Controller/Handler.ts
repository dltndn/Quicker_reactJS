import io from "../Config/SocketConnector";

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

  sendMessage: (socket: any, roomName: string) => (receiveMessage: Message, done : Function) => {
    // 해당 방에 전부 메세지 보냄
    socket.in(roomName).emit("sendMessage", receiveMessage.data);
    console.log("현재 접속 방 정보 : ", roomName)
    console.log("수신 메세지 : ", receiveMessage.data);
    done();
  },

  joinRoom: (socket: any, originRoomName : String) => (roomName: roomName, done : Function) => {
    // 해당 방에 전부 메세지 보냄
    console.log("접속 방 이름 : ", roomName);
    done();
  },
};

interface roomName {
  roomName : String
}

interface Message {
  data: String;
  sender: String;
}

export = socketHandler;