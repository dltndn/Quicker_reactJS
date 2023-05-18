import { Request, Response } from "express";
import DeleteOrder from "../models/DeleteOrder"

export = {
  deleteAssociateOrderProcess: async (req: Request, res: Response) => {
    try {
      let deleteTargetId = parseInt(req.body.id);
      DeleteOrder.deleteOrder(deleteTargetId);
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  },

  deleteAssociateOrdersProcess: async (req: Request, res: Response) => {
    try {
      let startNumber = parseInt(req.body.startNumber);
      let endNumber = parseInt(req.body.endNumber);
      console.log(startNumber, endNumber)
      let index = startNumber;
      for (index; index <= endNumber; index++) {
        DeleteOrder.deleteOrder(index)
      }
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  },
};
