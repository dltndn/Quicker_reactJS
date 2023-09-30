import { NextFunction, Request, Response } from "express";
import { messageInstance } from "../mongo/command";

export class ChatController {
  async getRecentMessage (req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.query.orderNum;
      if (typeof orderId !== "number") throw new Error ("orderId not exist")
      const recentMessage = await messageInstance.findRecent(orderId)
      res.send(recentMessage);
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}