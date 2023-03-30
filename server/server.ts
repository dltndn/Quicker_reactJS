import express, { Application, Request, Response } from "express";
import sequelize from "./sequelizeConnector";
import {initModels,User,Birth_date,Join_date,Order,Destination,Transportation,Departure,Product, Sender,Recipient} from "./models/DB/init-models";
import UserController = require("./controllers/UserController");

initModels(sequelize);

const cors = require("cors");
const http = require("http");
const io = require("socket.io");
const app: Application = express();
const port: Number = 9000;
const httpServer = http.createServer(app).listen(9001);
const bodyParser = require("body-parser");
const crypto = require("crypto");

const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
require("dotenv").config();
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

let roomName = "testroom";

let sockets: Array<Object> = [];
socketServer.on("connect", (socket: any) => {
  sockets.push(socket);
  socket.join(roomName);
  socket.on("sendMessage", (message: MessageObejct, done: Function) => {
    socket.to(roomName).emit("sendMessage", message.data);
    console.log(message.data);
    done();
  });
});

interface MessageObejct {
  data: String;
}

app.get("/", UserController.home);
app.get("/checkJoin", UserController.checkJoin);
app.get("/deleteAssociateOrder",UserController.deleteAssociateOrder);
app.post("/deleteAssociateOrderProcess", UserController.deleteAssociateOrderProcess);
app.post("/orderlist", UserController.orderlist);
app.post("/register", UserController.register);
app.post("/request", UserController.request);

app.listen(port, () => {console.log(`App is listening on port ${port} !`);});
