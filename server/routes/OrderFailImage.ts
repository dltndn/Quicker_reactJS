import express, { Application, NextFunction, Request, Response } from "express";
import multer from "multer";
import {ImageFileSchema} from "../Mongo/Schemas/ImageFile";
import connectMongo from "../Mongo/Connector";

require("dotenv").config();

const router = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router
  .get("/", async (req: Request, res: Response): Promise<any> => {
    try {
      const orderId = req.query.orderNum;
      if (typeof orderId === "string") {
        const conn = await connectMongo("orderFail");
        const uploadImage = conn.model(orderId, ImageFileSchema);
        const data = await uploadImage.find({});
        conn.destroy();
        res.send({ imageBuffer: data[0].image, reason : data[0].reason});
      }
    } catch (error) {
      console.log(error);
    }
  })
  .post("/", upload.single("image"), async (req: Request, res: Response): Promise<any> => {
      try {
        const documentFile = (req as MulterRequest).file;
        const bufferImage = documentFile.buffer;
        const orderNum = req.body.orderNum;
        const reason = req.body.reason

        const conn = await connectMongo("orderFail");

        const uploadImage = conn.model(orderNum, ImageFileSchema);

        const image = new uploadImage({
          image: bufferImage,
          reason : reason
        });
        
        await image.save();
        conn.destroy();
        res.send({ msg: "done" });
      } catch (error) {
        console.log(error);
      }    
    }
  
    );

  interface MulterRequest extends Request {
    file: any;
  }

  export default router;