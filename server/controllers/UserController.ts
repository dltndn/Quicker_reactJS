import { Request, Response } from "express";
import DeleteOrder = require("../models/DeleteOrder");
import SelectOrder = require("../models/SelectOrder");

const crypto = require("crypto");

export = {
  home: (req: Request, res: Response) => {
    res.send(`
          <button onclick="location.href='/deleteAssociateOrder'">deleteAssociateOrder</button>
          <button onclick="location.href='/CreateAssociatedOrdertableTable'">CreateAssociatedOrdertableTable</button>
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
    let deleteTargetId = parseInt(req.body.id);
    try {
      DeleteOrder.deleteOrder(deleteTargetId);
      res.send("done");
    } catch (error) {
      res.send(error);
    }
  },

  checkJoin: async (req: Request, res: Response) => {
    try {
      let data = await SelectOrder.checkJoin();
      console.log(JSON.stringify(data, null, 2));
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
};
