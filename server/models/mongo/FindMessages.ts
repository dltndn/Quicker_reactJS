import mongoose from "mongoose";
import MessageModel from "./Message"
import connectMongo from "./connector";

require("dotenv").config();

async function findMessage(roomName: string) {
  try {
    connectMongo();
    const Message = mongoose.model((String)(roomName), MessageModel);
    const messages = await Message.find();
    return messages
  } catch (error) {
    console.log(error);
  }
}

export = findMessage;
