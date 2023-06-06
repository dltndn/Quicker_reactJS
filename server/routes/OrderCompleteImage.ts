import express, { Request, Response } from "express";
import multer from "multer";
import mongoose from "mongoose";
// import ImageFileSchema from "../Mongo/Schemas/ImageFile";
import connectMongo from "../Mongo/Connector";
import ImageFileSchema from "../Mongo/Schemas/ImageFile";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

router
  .get("/", async (req: Request, res: Response): Promise<any> => {
    try {
      const query = req.query;
      const orderId = query.orderNum;

      const conn = await connectMongo("orderComplete");
      let imageModel
      if (typeof orderId === "string") {
        imageModel = conn.model(orderId, ImageFileSchema);
        const images = await imageModel.find();
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
  
    const test = new mongoose.Schema({
      image : Buffer, 
      test : String   
    });

    const uploadImage = conn.model(orderNum, test);
    
    const image = new uploadImage({
      image : bufferImage,
      test : "t1"
    });
    await image.save();
    res.send({msg : "done"})
  } catch (error) {
    console.log(error)
  }
})

interface MulterRequest extends Request {
  file: any;
}

export default router;