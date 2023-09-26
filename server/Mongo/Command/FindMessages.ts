import mongoose, { Connection } from "mongoose";
import MessageSchema from "../Schemas/Message";
import connectMongo from "../Connector";
import MessageModel from "../Schemas/Message"

require("dotenv").config();

export async function findMessage(roomName: string) {
  try {
    const conn = await connectMongo("chat");
    const messageModel = conn.model(roomName, MessageSchema);
    const messages = await messageModel.find();
    conn.destroy();
    return messages
  } catch (error) {
    console.error(error);
  }
}

export const findRecentMessageByOrderNumber = async (connector : Connection, orderNum : number ) => {
  const messageModel = connector.model(String(orderNum), MessageModel);
  const recentMessage = await messageModel.findOne().select(["-_id", "-__v", "-roomName"]).sort({ $natural: -1 });
  return recentMessage
}

