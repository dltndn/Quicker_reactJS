import mongoose from "mongoose";
import MessageSchema from "../Schemas/Message";
import connectMongo from "../Connector";

require("dotenv").config();

async function findMessage(roomName: string) {
  try {
    connectMongo("chat");
    const Message = mongoose.model((String)(roomName), MessageSchema);
    const messages = await Message.find();
    return messages
  } catch (error) {
    console.error(error);
  }
}

export default findMessage;
