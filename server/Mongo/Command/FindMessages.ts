import mongoose from "mongoose";
import MessageSchema from "../Schemas/Message";
import connectMongo from "../Connector";

require("dotenv").config();

async function findMessage(roomName: string) {
  try {
    const conn = await connectMongo("chat");
    const Message = conn.model((String)(roomName), MessageSchema);
    const messages = await Message.find();
    conn.close();
    return messages
  } catch (error) {
    console.error(error);
  }
}

export default findMessage;
