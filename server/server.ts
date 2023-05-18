import express, { Application, Request, Response } from "express";
import chat from "./chat/socket";
import OrderController = require("./controllers/OrderController");
import UserController = require("./controllers/UserController");
import ChatController = require("./controllers/ChatController");
import AssociateOrder from "./routes/AssociateOrder";
import Home from "./routes/Home"; 
const cors = require("cors");
const app: Application = express();
const port: Number = 9000;
const bodyParser = require("body-parser");

app.use(cors());
require("dotenv").config();
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
app.post("/getRecentMessage", ChatController.getRecentMessage);
app.post("/getUserNameUseByWalletAddress", UserController.getUserNameUseByWalletAddress);
app.post("/getRoomInfo", OrderController.getRoomInfo);


app.listen(port, () => {console.log(`App is listening on port ${port} !`);});
