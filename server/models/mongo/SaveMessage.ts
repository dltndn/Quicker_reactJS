import mongoose from "mongoose";
import MessageModel from "./Message"
import connectMongo from "./connector";

require("dotenv").config();

async function saveMessage(messageObjcet : MessageObject) {
  try {
    const Message = mongoose.model((String)(messageObjcet.roomName), MessageModel);
    connectMongo("chat");
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

interface MessageObject {
  id: string;
  roomName: string;
  receiveMessage: string;
}

export = saveMessage;
