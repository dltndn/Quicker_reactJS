import { Request, Response } from "express";
import SelectOrder from "../Maria/Commands/SelectOrder";
import CreateUser from "../Maria/Commands/CreateUser";
import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";
import SelectUser from "../Maria/Commands/SelectUser";

initModels(sequelize);
const crypto = require("crypto");

export default {
  // NOTE : 이름 변경 필
  getRequests: async (req: Request, res: Response) => {
    try {
      const userWalletAdress = req.body.userWalletAdress;
      console.log("USER_WALLET_ADRESS : ", userWalletAdress);
      const userId = await SelectUser.getUserId(userWalletAdress);
      // @ts-ignore
      let data = await SelectOrder.getRequests(userId.id);
      console.log(data)
      res.send(data);
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

  getUserNameUseByWalletAddress: async (req: Request, res: Response) => {
    try {
      const walletAddress = req.body.walletAddress;
      let data = (await SelectUser.getUserName(walletAddress)) as {
        name: string | null;
      };
      console.log("userName: ",data.name)
      res.send({ name: data.name });
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  },
};
