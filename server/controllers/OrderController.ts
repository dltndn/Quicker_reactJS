import { NextFunction, Request, Response } from "express";

import SelectOrder from "../Maria/Commands/SelectOrder";
import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";

import { createOrder, findCurrentLocation, findDestinationAndDepartureByOrderId, findImage, postCurrentLocation, saveImage, updateOrder } from "../service/Order";
import { findRoomInfoByOrderNumber } from "../service/Room";
import { MulterRequest } from "../routes/OrderCompleteImage";

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

  getImage : async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const image = findImage(query);
      res.send(image);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  postImage : async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const documentFile = (req as MulterRequest).file;
      await saveImage(body, documentFile);
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};



