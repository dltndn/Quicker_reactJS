// 필요한 모듈 import
import express, { Application } from "express";
import chat from "./chat/socket";
import compression from "compression";
import morgan from "morgan"

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
const HTTP_PORT = (process.env.NODE_ENV === "development") ? process.env.HTTP_LOCAL_SERVER_PORT : process.env.HTTP_AWS_SERVER_PORT;
const HTTPS_PORT = (process.env.NODE_ENV === "development") ? process.env.HTTPS_LOCAL_SERVER_PORT : process.env.HTTPS_AWS_SERVER_PORT;
const bodyParser = require("body-parser");

// const options = {
//   key: fs.readFileSync("./config/cert.key"),
//   cert: fs.readFileSync("./config/cert.crt"),
// };
  
require("dotenv").config();
app.use(morgan('combined'))
app.use(compression())
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

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

const server = app.listen(HTTP_PORT, () => console.log(`App is listening on port ${HTTP_PORT} !`));

// const server = https.createServer(options, app).listen(HTTPS_PORT, () => {
//   console.log(`HTTPS server started on port ${HTTPS_PORT}`);
// });
// socket
chat(server)