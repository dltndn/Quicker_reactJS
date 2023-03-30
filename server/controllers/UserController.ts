import { Request, Response } from "express";
import DeleteOrder = require("../models/DeleteOrder");
import SelectOrder = require("../models/SelectOrder");
import CreateUser = require("../models/CreateUser");

const crypto = require("crypto");

export = {
  home: (req: Request, res: Response) => {
    res.send(`
        <button onclick="location.href='/deleteAssociateOrder'">deleteAssociateOrder</button>
        <button onclick="location.href='/checkJoin'">checkJoin</button>
    `);
  },

  deleteAssociateOrder: (req: Request, res: Response) => {
    res.send(`
        <form action="/deleteAssociateOrderProcess" method="POST">
          삭제할 오더의 행 번호를 입력하면 오더 테이블과 연관된 테이블들의 정보가 삭제됩니다.<br>
          해당 테이블 : Transportation, Sender, Recipient, Destination, Departure, Product, Order Transportation, Sender, Recipient, Destination, Departure, Product, Order <br>
          <input type="text" name="id" placeholder="삭제할 오더의 행 번호 입력"></input>
          <button type="submit" class="btn btn-outline-secondary">확인</button>
        </form>
    `);
  },

  deleteAssociateOrderProcess: async (req: Request, res: Response) => {
    try {
      let deleteTargetId = parseInt(req.body.id);
      DeleteOrder.deleteOrder(deleteTargetId);
      res.send("done");
    } catch (error) {
      res.send(error);
    }
  },

  checkJoin: async (req: Request, res: Response) => {
    try {
      let data = await SelectOrder.checkJoin();
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },

  orderlist: async (req: Request, res: Response) => {
    const id = parseInt(req.body.id);
    try {
      let instance = await SelectOrder.getOrderlist(id);
      res.send(instance);
    } catch {
      res.send("fail");
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
  },

  request : async (req: Request, res: Response) => {
    try {
      const data = req.body
  
      // 사용자의 아이디를 찾아서 ID_REQ에 집어 넣어야함 
      let userId = await SelectOrder.getUserId
      if (userId){
        // @ts-ignore
        data.Order.ID_REQ = userId.dataValues.id;
        await CreateUser.Order(data)
        
        res.send("done")
      }
      res.send("empty")
    } catch (error) {
      res.send(error);
    }
  }
};
