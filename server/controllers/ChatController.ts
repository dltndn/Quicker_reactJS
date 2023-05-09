import { Request, Response } from "express";
import mongoose from "mongoose";
import MessageModel from "../models/mongo/Message";
import connectMongo from "../models/mongo/connector";

export = {
  getRecentMessage: async (req: Request, res: Response) => {
    const orderNum = req.body.orderNum;
    console.log((String)(orderNum))
    try {
      connectMongo();
      const Message = mongoose.model((String)(orderNum), MessageModel);
      const recentMessage = await Message.findOne().sort({$natural:-1});
      console.log(recentMessage?.message)
      res.send({recentMessage : recentMessage?.message})
    } catch {
      return res.send({ msg: "fail" });
    }
  },
};
