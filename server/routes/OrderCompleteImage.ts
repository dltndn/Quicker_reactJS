import express, { Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";
import connectMongo from "../Mongo/Connector";
import ImageFileSchema from "../Mongo/Schemas/ImageFile";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

router
  .get("/", async (req: Request, res: Response): Promise<any> => {
    try {
      const orderId = req.query.orderNum;

      const conn = await connectMongo("orderComplete");
      if (typeof orderId === "string") {
        const imageModel = conn.model(orderId, ImageFileSchema);
        const images = await imageModel.find();
        conn.destroy();
        res.send({imageBuffer : images[0].image})
      }
    } catch (error) {
      console.log(error)
      res.send({msg : 'fail'})
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