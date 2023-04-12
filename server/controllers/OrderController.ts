import { Request, Response } from "express";
import SelectOrder from "../models/SelectOrder"
import CreateOrder from "../models/CreateOrder"
import sequelize from "../SequelizeConnector"
import {initModels} from "../models/DB/init-models";

initModels(sequelize);

export = {
  request: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      console.log(data)
      // 사용자의 아이디를 찾아서 ID_REQ에 집어 넣어야함
      let userId = await SelectOrder.getUserId(data.userWalletAddress);
      console.log(userId)
      if (userId) {
        // @ts-ignore
        data.Order.ID_REQ = userId.dataValues.id;

        await CreateOrder.Order(data);

        return res.send({ msg: "done" });
      } else {
        res.send(res.send({msg : "회원이 아님"}))
      }
      return res.send({ msg: "fail" });
    } catch (error) {
      return res.send({ msg: error });
    }
  },

  orderlist: async (req: Request, res: Response) => {
    const data = req.body.list;
    try {
      let instance = await SelectOrder.getOrderlist(data);
      res.send(instance)
    } catch {
      res.send("fail");
    }
  },

  updateOrder: async (req: Request, res: Response) => {
    const data = req.body.list;
  },
};