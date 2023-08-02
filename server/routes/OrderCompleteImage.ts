import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";

import connectMongo from "../Mongo/Connector";
import { findImage } from "../service/Order";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

router.get("/", async (req: Request, res: Response, next : NextFunction) => {
    try {
      const query = req.query
      const image = findImage(query)
      res.send(image)
    } catch (error) {
      console.error(error)
      next(error)
    }
  })
  .post("/" , upload.single('uploadImage'), async (req: Request, res: Response): Promise<any> => {
  try {
    const documentFile = (req as MulterRequest).file;
    const bufferImage = documentFile.buffer
    const orderNum = req.body.orderNum
    
    const conn = await connectMongo("orderComplete");
  
    const schema = new mongoose.Schema({
      image : Buffer
    });

    const imageModel = conn.model(orderNum, schema);
    
    const image = new imageModel({
      image : bufferImage
    });
    await image.save();
    conn.destroy();
    res.send({msg : "done"})
  } catch (error) {
    console.log(error)
  }
})

interface MulterRequest extends Request {
  file: any;
}

export default router;