import express from "express";
import { Request, Response } from "express";
import connectMongo from "../Mongo/Connector";
import RealLocationSchema from "../Mongo/Schemas/realLocation";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const address = "지갑주소";
    const tempX = 37.4;
    const tempY = 128.4;

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

export default router







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