import mongoose from "mongoose";
import Message from "./message"
require("dotenv").config();

const connectMongo = async () => {
  if (process.env.MONGO_CHAT !== undefined) {
    await mongoose.connect(process.env.MONGO_CHAT);
  }
};

async function main(messageObjcet: any) {
  console.log(messageObjcet);
  try {
    connectMongo();
    const userMessage = new Message({
        id: messageObjcet.id,
        message: messageObjcet.receiveMessage,
        roomName: messageObjcet.roomName,
    });
    userMessage.save();
  } catch (error) {
    console.log(error);
  }
}

export = main;
