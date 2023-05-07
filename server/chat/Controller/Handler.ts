import io from "../Config/SocketConnector";
import mongoDB from "../../models/mongo/mongo";
const socketHandler = {

  printRoomInfo : () => {
    console.log("연결됨");
    const count = io.engine.clientsCount;
    console.log("서버 인원 수 : ", count);
  },
  disconnect: (socket: any) => {
    socket.disconnect();
    console.log("disconnected");
  }
};

interface roomName {
  roomName : String
}


export = socketHandler;