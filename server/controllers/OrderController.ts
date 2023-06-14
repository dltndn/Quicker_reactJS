import { Request, Response } from "express";

import SelectOrder from "../Maria/Commands/SelectOrder";
import CreateOrder from "../Maria/Commands/CreateOrder";
import sequelize from "../Maria/Connectors/SequelizeConnector"
import {initModels} from "../Maria/Models/init-models";
import UpdateOrder from "../Maria/Commands/UpdateOrder";
import CreateChatRoom from "../Maria/Commands/CreateChatRoom";
import SelectUser from "../Maria/Commands/SelectUser";
import SelectRoomInfo from "../Maria/Commands/SelectRoomInfo";

import sendMessage from "../sendMessage"
import { encrypt, decrypt } from "../lib/cryto";

initModels(sequelize);

export default {
  request: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      console.log("data: ", data)
      // 사용자의 아이디를 찾아서 ID_REQ에 집어 넣어야함
      let userId = await SelectUser.getUserId(data.userWalletAddress);
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
      console.log(error)
      return res.send({ msg: error });
    }
  },

  orderlist: async (req: Request, res: Response) => {
    try {
      const data = req.body.list;
      let instance = await SelectOrder.getOrderlist(data);
      res.send(instance)
    } catch (error){
      console.log(error)
      res.send("fail");
    }
  },

  order: async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const orderId = query.orderid;
      
      if (typeof orderId === "string") {
        const instance = await SelectOrder.location(parseInt(orderId))
        res.send(instance)
      }
    } catch (error){
      console.log(error)
      res.send("fail");
    }
  },

  updateOrder: async (req: Request, res: Response) => {
    try {
      console.log(1)
      // const userWalletAddress = req.body.userWalletAddress;
      // const orderId = req.body.orderId;
      // const deliver = await SelectUser.getUserId(userWalletAddress);
    
      // // @ts-ignore
      // await UpdateOrder.updateOrder(deliver.dataValues.id, orderId)
      // // @ts-ignore
      // let requesterId = await SelectUser.getRequesterId(orderId);
      // // @ts-ignore
      // await CreateChatRoom.createChatRoom(orderId, deliver.dataValues.id, requesterId.dataValues.ID_REQ)
      
      const receiver = await SelectOrder.receiverPhoneNumber(24)
    
      if ((typeof receiver === "object") && (receiver !== null && "PHONE" in receiver && typeof receiver.PHONE === "string")) {
        console.log(2)
        // 기본 url
        let url = process.env.CLIENT_SERVER_DOMAIN
        // url 수정 
        console.log(typeof url)
        if (typeof url === "string") {
          console.log(3)
          const encryptedUrl = encrypt(JSON.stringify(req.body))
          url = url + encryptedUrl
          // // 문자 발송
          // console.log(4)
          // await sendMessage(receiver.PHONE, url)  
        } else {
          throw new Error ("CLIENT_SERVER_DOMAIN 이 정상적인 값이 아님")
        }
      } else {
        throw new Error ("전송 받은 데이터에 문제가 있음")
      }
      
      return res.send({msg : "done"})
    } catch (error){
      console.log(error)
      return res.send({msg : "fail"})
    }
  },

  getRoomInfo : async (req: Request, res: Response) => {
    try {
      const orderNum = req.body.orderNum;
      let data = await SelectRoomInfo.getRoomInfo(orderNum)
      return res.send(JSON.stringify(data))
    } catch (error) {
      console.log(error)
      return res.send({msg : "fail"})
    }
  },
};



