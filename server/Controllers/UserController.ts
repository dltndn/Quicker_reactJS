import { NextFunction, Request, Response } from "express";
import SelectOrder from "../Maria/Commands/SelectOrder";
import CreateUser from "../Maria/Commands/CreateUser";
import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";
import SelectUser from "../Maria/Commands/SelectUser";
import {findUserNameByWalletAddress} from "../service/User";

initModels(sequelize);
const crypto = require("crypto");

export default {
  
  // NOTE : 이름 변경 필
  getRequests: async (req: Request, res: Response) => {
    try {
      const userWalletAdress = req.query.userWalletAdress;
      if (typeof userWalletAdress === "string") {
        const userId = await SelectUser.getUserId(userWalletAdress);
        // @ts-ignore
        let data = await SelectOrder.getRequests(userId.id);
        res.send(data);
      }
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const secret = process.env.cryptoKey;
      const userInstance = req.body.User;
      const userBirthDate = req.body.Birthday;
      //NOTE : 전화번호를 기반으로 암호화한 id 사용
      const hashed = crypto
        .createHmac("sha256", secret)
        .update(userInstance.contact)
        .digest("hex");
      userInstance.id = hashed;
      userBirthDate.id = hashed;
      console.log(userInstance, userBirthDate, hashed)
      await CreateUser.registerUser(userInstance, userBirthDate, hashed);
      res.send({ msg: "done" });
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  },

  findUserNameByWalletAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const userName = await findUserNameByWalletAddress(body);
      res.json(userName);
    } catch (error) {
      console.error(error)
      next(error)
    }
  },
};
