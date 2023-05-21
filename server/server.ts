// 필요한 모듈 import
import express, { Application, NextFunction, Request, Response } from "express";
import chat from "./chat/socket";
import multer from "multer";

// 라우터 처리 미완료
import OrderController = require("./controllers/OrderController");
import UserController = require("./controllers/UserController");
import ChatController = require("./controllers/ChatController");

// 라우터 처리 완료
import AssociateOrder from "./routes/AssociateOrder";
import Home from "./routes/Home"; 
import connectMongo = require("./models/mongo/connector");
import mongoose from "mongoose";

// 설정
const cors = require("cors");
const app: Application = express();
const port: Number = 9000;
const bodyParser = require("body-parser");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

require("dotenv").config();
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());



// socket
chat()

// 개발용 라우터
app.use("/", Home);
app.use("/AssociateOrder",AssociateOrder);

// 서비스용 라우터
app.post("/getRequests", UserController.getRequests);
app.post("/orderlist", OrderController.orderlist);
app.post("/register", UserController.register);
app.post("/request", OrderController.request);
app.post("/updateorder", OrderController.updateOrder);
app.post("/getRecentMessageInfo", ChatController.getRecentMessageInfo);
app.post("/getUserNameUseByWalletAddress", UserController.getUserNameUseByWalletAddress);
app.post("/getRoomInfo", OrderController.getRoomInfo);
// 테스트 중

const Image = new mongoose.Schema({
  image : Buffer,    
});

app.get("/orderComplete", async (req: Request, res: Response): Promise<any> => {
    try {
      const uploadImage = mongoose.model("1", Image);
      await connectMongo("orderComplete");
      const data = await uploadImage.find({});
      console.log(data)
      res.send({imageBuffer : data[0].image})
    } catch (error) {
      console.log(error)
    }  

  })
  .post("/orderComplete" , upload.single('uploadImage'), async (req: Request, res: Response): Promise<any> => {
  
  const documentFile = (req as MulterRequest).file;
  const bufferImage = documentFile.buffer
  
  const orderNum = req.body.orderNum
  
  await connectMongo("orderFail");
  
  const uploadImage = mongoose.model(orderNum, Image);
  
  const adef = new uploadImage({
    image : bufferImage,  
  });
  await adef.save();
  res.send({msg : "done"})
})
  
interface MulterRequest extends Request {
    file: any;
}

app.listen(port, () => {console.log(`App is listening on port ${port} !`);});
