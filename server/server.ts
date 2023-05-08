import express, { Application, Request, Response } from "express";
import chat from "./chat/socket";
import AdminController = require("./controllers/AdminController");
import OrderController = require("./controllers/OrderController");
import UserController = require("./controllers/UserController");
import ChatController = require("./controllers/ChatController");

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

app.get("/", AdminController.home);
app.get("/deleteAssociateOrder",AdminController.deleteAssociateOrder);
app.post("/deleteAssociateOrderProcess", AdminController.deleteAssociateOrderProcess);
app.get("/deleteAssociateOrders",AdminController.deleteAssociateOrders);
app.post("/deleteAssociateOrdersProcess", AdminController.deleteAssociateOrdersProcess);
app.post("/getRequests", UserController.getRequests);
app.post("/orderlist", OrderController.orderlist);
app.post("/register", UserController.register);
app.post("/request", OrderController.request);
app.post("/updateorder", OrderController.updateOrder);
app.post("/getRecentMessage", ChatController.getRecentMessage);
app.post("/getUserNameUseByWalletAddress", UserController.getUserNameUseByWalletAddress);
app.post("/getRoomInfo", OrderController.getRoomInfo);


app.listen(port, () => {console.log(`App is listening on port ${port} !`);});
