import { NextFunction, Request, Response } from "express";
import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";
import { findOrdersByWalletAddress } from "../service/Order";
import { findUserNameByWalletAddress, registerUser } from "../service/User";

require("dotenv").config();
initModels(sequelize);

export default {
  
  // NOTE : 이름 변경 필
  getRequests: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const query = req.query
      const orders = await findOrdersByWalletAddress(query)
      res.send(orders)
    } catch (error) {
      console.error(error)
      next(error);
    }
  },

  register: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const body = req.body
      await registerUser(body)
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error)
      next(error);
    }
  },

  findUserNameByWalletAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const userName = await findUserNameByWalletAddress(query);
      res.json(userName);
    } catch (error) {
      console.error(error)
      next(error)
    }
  },
};
