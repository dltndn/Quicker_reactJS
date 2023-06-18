import mongoose from "mongoose";
import MessageSchema from "../Schemas/Message"
import connectMongo from "../Connector";

require("dotenv").config();

async function saveMessage(messageObjcet : MessageObject) {
  try {
    const conn = await connectMongo("chat");
    const Message = conn.model((String)(messageObjcet.roomName), MessageSchema);
    const userMessage = new Message({
      id: messageObjcet.id,
      message: messageObjcet.receiveMessage,
      roomName: messageObjcet.roomName,
    });
    await userMessage.save();
    conn.destroy();
  } catch (error) {
    console.error(error);
  }
}

interface MessageObject {
  id: string;
  roomName: string;
  receiveMessage: string;
}

export default saveMessage;
