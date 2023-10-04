import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import MessageModel from "../Mongo/Schemas/Message";
import connectMongo from "../Mongo/Connector";
import { findRecentMessage } from "../service/Room";
export default {
  getRecentMessageInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const recentMessage = await findRecentMessage(query)
      res.send(recentMessage);
    } catch (error) {
      console.error(error);
      next(error)
    }
  },
};