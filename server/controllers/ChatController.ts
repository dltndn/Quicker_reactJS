import { Request, Response } from "express";
import mongoose from "mongoose";
import MessageModel from "../models/mongo/Message";
import connectMongo from "../models/mongo/connector";

export = {
  getRecentMessageInfo: async (req: Request, res: Response) => {
    try {
      const orderNum = req.body.orderNum;
      console.log(String(orderNum));
      connectMongo("chat");
      const Message = mongoose.model(String(orderNum), MessageModel);
      const recentMessage = await Message.findOne().sort({ $natural: -1 });
      res.send(recentMessage);
    } catch (error) {
      console.error(error);
      return res.send({ msg: "fail" });
    }
  },
};
