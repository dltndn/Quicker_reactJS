import { Request, Response } from "express";
import DeleteOrder from "../models/DeleteOrder"

export = {
  home: (req: Request, res: Response) => {
    res.send(`
        <button onclick="location.href='/deleteAssociateOrder'">오더 관련 행 하나 없애기</button>
        <button onclick="location.href='/deleteAssociateOrders'">오더 관련 행 여러개 없애기</button>
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
      res.redirect("/deleteAssociateOrder");
    } catch (error) {
      res.send(error);
    }
  },
  
  deleteAssociateOrders: (req: Request, res: Response) => {
    res.send(`
        <form action="/deleteAssociateOrdersProcess" method="POST">
          삭제할 오더의 행 번호를 입력하면 오더 테이블과 연관된 테이블들의 정보가 삭제됩니다.<br>
          해당 테이블 : Transportation, Sender, Recipient, Destination, Departure, Product, Order Transportation, Sender, Recipient, Destination, Departure, Product, Order <br>
          <input type="text" name="startNumber" placeholder="삭제할 오더의 시작 행 번호 입력"></input>
          <input type="text" name="endNumber" placeholder="삭제할 오더의 끝 행 번호 입력"></input>
          <button type="submit" class="btn btn-outline-secondary">확인</button>
        </form>
    `);
  },

  deleteAssociateOrdersProcess: async (req: Request, res: Response) => {
    try {
      let startNumber = parseInt(req.body.startNumber);
      let endNumber = parseInt(req.body.endNumber);
      console.log(startNumber, endNumber)
      let index = startNumber;
      for (index; index < endNumber; index++) {
        DeleteOrder.deleteOrder(index)
      }
      res.redirect("done");
    } catch (error) {
      res.send(error);
    }
  },
};
