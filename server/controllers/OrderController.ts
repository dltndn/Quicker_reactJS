import { NextFunction, Request, Response } from "express";

import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";

import { createOrder, findCurrentLocation, findDestinationAndDepartureByOrderId, findFailImage, findImage, findUserOrdersDetail, postCurrentLocation, saveFailImage, saveImage, updateOrder } from "../service/Order";
import { findRoomInfoByOrderNumber } from "../service/Room";
import { MulterRequest } from "../routes/OrderCompleteImage";

initModels(sequelize);

export default {
  request: async (req: Request, res: Response, next : NextFunction) => {
    try {
      const body = req.body;
      await createOrder(body);
      res.send({ msg: "done" });
    } catch (error) {
      next(error)
    }
  },

  orderlist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const orders = await findUserOrdersDetail(query)
      res.send(orders)
    } catch (error){
      next(error)
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
  },

  getFailImage : async (req: Request, res: Response, next : NextFunction) => {
    try {
      const query = req.query
      const image = await findFailImage(query)
      if (image === null || undefined) {
        res.send({message : "image not exist"})
      }
      else {
        res.send({ imageBuffer: image.image, reason : image.reason});
      }
    } catch (error) {
      next(error)
    }
  },

  postFailImage : async (req: Request, res: Response, next : NextFunction) => {
    try {
      const body = req.body
      const documentFile = req.file;
      const message = await saveFailImage(body, documentFile)
      res.send({ msg: message });
    } catch (error) {
      next(error)
    }
  }
};



