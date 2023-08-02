import { NextFunction, Request, Response } from "express";

import SelectOrder from "../Maria/Commands/SelectOrder";
import sequelize from "../Maria/Connectors/SequelizeConnector"
import {initModels} from "../Maria/Models/init-models";
import UpdateOrder from "../Maria/Commands/UpdateOrder";
import CreateChatRoom from "../Maria/Commands/CreateChatRoom";
import SelectUser from "../Maria/Commands/SelectUser";

import sendMessage from "../sendMessage"
import { encrypt, decrypt } from "../lib/cryto";
import { findRoomInfoByOrderNumber } from "../service/Room";
import { createOrder, findCurrentLocation, findDestinationAndDepartureByOrderId, postCurrentLocation, updateOrder } from "../service/Order";

initModels(sequelize);

export default {
  request: async (req: Request, res: Response) => {
    try {
      const body = req.body;
      await createOrder(body);
      res.send({ msg: "fail" });
    } catch (error) {
      console.error(error)
      res.send(error);
    }
  },

  orderlist: async (req: Request, res: Response) => {
    try {
      const data = req.body.list;
      const orders = await SelectOrder.getOrderlist(data);
      res.send(orders)
    } catch (error){
      console.log(error)
      res.send("fail");
    }
  },
  
  order: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const query = req.query;
      const instance = await findDestinationAndDepartureByOrderId(query);
      res.send(instance)
    } catch (error){
      console.error(error)
      next(error)
    }
  },

  updateOrder: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const body = req.body
      await updateOrder(body)
      res.send({msg : "done"})
    } catch (error){
      console.error(error)
      next(error)
    }
  },

  getRoomInfo : async (req: Request, res: Response, next : NextFunction) => {
    try {
      const query = req.query;
      const room = await findRoomInfoByOrderNumber(query)
      res.json(room)
    } catch (error) {
      console.error(error)
      next(error)
    }
  },

  postLocation :  async (req: Request, res: Response, next : NextFunction) => {
    try {
      const body = req.body
      await postCurrentLocation(body)
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error);
      next(error)
    }
  },

  getLocation : async (req: Request, res: Response,  next : NextFunction) => {
    try {
      const query = req.query
      const loaction = await findCurrentLocation(query);
      res.json(loaction)
    } catch (error) {
      console.error(error);
      next(error)
    }
  },
};



