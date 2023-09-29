import { NextFunction, Request, Response } from "express";
import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";
import { cryptoUserInfo } from "../util/cryptoUserInfo";
import { orderInstance, userInstance } from "../Maria/Commands";

require("dotenv").config();
initModels(sequelize);

export class UserController {
  // NOTE : 이름 변경 필
  async getRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const walletAddress = query.userWalletAdress;
      if (typeof walletAddress !== "string") {
        throw new Error("TypeError : walletAddress be string");
      }

      const userId = await userInstance.findId(walletAddress);
      if (userId === null) {
        throw new Error("Not exist name");
      }
      const orders = await orderInstance.findForSearch(userId.id);
      res.send(orders);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { user, userBirthDate, hashed } = cryptoUserInfo(body);
      await userInstance.register(user, userBirthDate, hashed);
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async findUserNameByWalletAddress(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = req.query;
      const walletAddress = query.walletAddress;
      if (typeof walletAddress !== "string") {
        throw new Error("TypeError : walletAddress be string");
      }
      const user = await userInstance.findName(walletAddress);
      res.json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async putUserImageId(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { walletAddress, imageId } = body;
      const user = await userInstance.findId(walletAddress);
      if (user !== null) {
        console.log(user.id, imageId);
        await userInstance.updateImageId(user.id, imageId);
        res.send({ message: "done" });
      } else {
        throw new Error("Can not find user id");
      }
    } catch (error) {
      next(error);
    }
  }

  async getUserImageId(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const walletAddress = query.walletAddress;
      if (typeof walletAddress !== "string") {
        throw new Error("TypeError : walletAddress be string");
      }
      const user = await userInstance.findId(walletAddress);
      if (user === null) {
        throw new Error("userid not exist");
      }
      const imageId = await userInstance.findImageId(user.id);
      console.log(imageId);
      res.send(imageId);
    } catch (error) {
      next(error);
    }
  }
}
