import mongoose from "mongoose";
import MessageModel from "./Message"
import connectMongo from "./connector";

require("dotenv").config();

async function saveMessage(messageObjcet: any) {
  try {
    const Message = mongoose.model((String)(messageObjcet.roomName), MessageModel);
    connectMongo();
    const userMessage = new Message({
      id: messageObjcet.id,
      message: messageObjcet.receiveMessage,
      roomName: messageObjcet.roomName,
    });
    userMessage.save();
  } catch (error) {
    console.error(error);
  }
}

export = saveMessage;
