import mongoose from "mongoose";
import MessageModel from "./Message"
import connectMongo from "./connector";

require("dotenv").config();

async function findRecentMessages(roomNames : any) {
  try {
    connectMongo();
    let list = []
    for (const element of roomNames) {
      console.log(element)
      // const Message = mongoose.model((String)(roomNames), MessageModel);
      // const message = await Message.find();  
      // roomNames.push = message
    }
    return roomNames;
    
  } catch (error) {
    console.log(error);
  }
}

export = findRecentMessages;
