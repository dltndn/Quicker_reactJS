import express, { Application, NextFunction, Request, Response } from "express";
import multer from "multer";
import mongoose from "mongoose";
import ImageFileSchema from "../Mongo/Schemas/ImageFile";
import connectMongo from "../Mongo/Connector";

require("dotenv").config();


const router = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router
  // .get("/", async (req: Request, res: Response): Promise<any> => {
  //   try {
  //     const uploadImage = mongoose.model("1", ImageFileSchema);
  //     await connectMongo("orderFail");
  //     const data = await uploadImage.find({});
  //     console.log(data);
  //     res.send({ imageBuffer: data[0].image });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })
  .post("/", upload.single("image"), async (req: Request, res: Response): Promise<any> => {
      try {
        const documentFile = (req as MulterRequest).file;
        const bufferImage = documentFile.buffer;
        const orderNum = req.body.orderNum;


        const conn = await connectMongo("orderFail");

        const uploadImage = conn.model(orderNum, ImageFileSchema);

        const image = new uploadImage({
          image: bufferImage,
        });
        
        await image.save();
        await res.send({ msg: "done" });
      } catch (error) {
        console.log(error);
      }    
    }
  
    );

  interface MulterRequest extends Request {
    file: any;
  }

  export default router;