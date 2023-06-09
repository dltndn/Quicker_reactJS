// 필요한 모듈 import
import express, { Application } from "express";
import chat from "./chat/socket";
const morgan = require('morgan')

// 라우터 처리 미완료
import OrderController from "./Controllers/OrderController";
import UserController from "./Controllers/UserController";
import ChatController from "./Controllers/ChatController";
import OrderCompleteImage from "./routes/OrderCompleteImage";
import OrderFailImage from "./routes/OrderFailImage";

// 라우터 처리 완료
import AssociateOrder from "./routes/AssociateOrder";
import Home from "./routes/Home";
import Order from "./routes/Order"
import realTimeLocation from "./routes/realTimeLocation"
// 설정
const cors = require("cors");
const app: Application = express();
const port: Number = (process.env.NODE_ENV === "development") ? 9000 : 80;
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(morgan('combined'))
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
app.use("/order-complete-image", OrderCompleteImage);
app.use("/order-fail-image", OrderFailImage);
app.use("/order", Order)
app.use("/test", realTimeLocation);

app.listen(port, () => console.log(`App is listening on port ${port} !`));
