import { Request, Response } from "express";
import SelectOrder = require("../models/SelectOrder");
import CreateUser = require("../models/CreateUser");
import sequelize from "../SequelizeConnector"
import {initModels} from "../models/DB/init-models";

initModels(sequelize);
const crypto = require("crypto");

export = {

  // NOTE : 이름 변경 필
  getRequests: async (req: Request, res: Response) => {
    try {
      let data = await SelectOrder.getRequests();
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },

  register: async (req: Request, res: Response) => {
    const secret = process.env.cryptoKey;
    try {
      const userInstance = req.body.User;
      const userBirthDate = req.body.Birthday;
      //NOTE : 전화번호를 기반으로 암호화한 id 사용
      const hashed = crypto.createHmac("sha256", secret).update(userInstance.contact).digest("hex");
      userInstance.id = hashed;
      userBirthDate.id = hashed;
      await CreateUser.registerUser(userInstance, userBirthDate, hashed);
      res.send({ msg: "done" });
    } catch (error) {
      res.send(error);
    }
  }
};
