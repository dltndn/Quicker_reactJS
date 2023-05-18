import mongoose from "mongoose";

const MessageModel =new mongoose.Schema({
  roomName: String,
  id: String,
  message: String,
  date : { type: Date, default: Date.now },
});

export = MessageModel