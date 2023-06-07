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
        res.send({data : data})
      }
    } catch (error) {
      console.log(error);
      res.send({ msg: "fail" });
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const address = "0x2cc285279f6970d00f84f3034439ab8d29d04d97";
      const tempY = 37.53467664139352;
      const tempX = 127.2130254778349;

      const conn = await connectMongo("realTimeLocation");
      const realLocationSchema = conn.model(address, RealLocationSchema);
      const realLocationModel = new realLocationSchema({
        X: tempX,
        Y: tempY,
      });
      await realLocationModel.save();

      res.send({ msg: "done" });
    } catch (error) {
      console.log(error);
      res.send({ msg: "fail" });
    }
  });

export default router;

// import { Request, Response } from "express";
// import connectMongo from "../Mongo/Connector";
// import RealLocationSchema from "../Mongo/Schemas/realLocation";

// const realTimeLocation = async (req: Request, res: Response) => {
//   try {
//     const address = "지갑주소"
//     const tempX = 37.4
//     const tempY = 128.4

//     const conn = await connectMongo("realTimeLocation");
//     const realLocationSchema = conn.model(address, RealLocationSchema);
//     const realLocationModel = new realLocationSchema ({
//         X : tempX,
//         Y : tempY
//     })
//     await realLocationModel.save();

//     res.send({ msg: "done" });
//   } catch (error) {
//     console.log(error)
//     res.send({msg : "fail"})
//   }
// };

// export default realTimeLocation;
