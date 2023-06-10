import express from "express";
import { Request, Response } from "express";
import connectMongo from "../Mongo/Connector";
import RealLocationSchema from "../Mongo/Schemas/realLocation";

const router = express.Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const address = req.query.quicker;
      if (typeof address === "string") {
        const conn = await connectMongo("realTimeLocation");
        const realLocationModel = conn.model(address, RealLocationSchema);
        const data = await realLocationModel.findOne({}).sort({ $natural: -1 });
        conn.close();
        res.send({data : data})
      }
    } catch (error) {
      console.log(error);
      res.send({ msg: "fail" });
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const address = req.body.address;
      const tempY = req.body.Y;
      const tempX = req.body.X;

      const conn = await connectMongo("realTimeLocation");
      const realLocationSchema = conn.model(address, RealLocationSchema);
      const realLocationModel = new realLocationSchema({
        X: tempX,
        Y: tempY,
      });
      await realLocationModel.save();
      conn.close();
      res.send({ msg: "done" });
    } catch (error) {
      console.log(error);
      res.send({ msg: "fail" });
    }
  });

export default router;