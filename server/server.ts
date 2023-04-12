import express, { Application, Request, Response } from "express";
import AdminController = require("./controllers/AdminController");
import OrderController = require("./controllers/OrderController");
import UserController = require("./controllers/UserController");

const cors = require("cors");
const http = require("http");
const io = require("socket.io");
const app: Application = express();
const port: Number = 9000;
const httpServer = http.createServer(app).listen(9001);
const bodyParser = require("body-parser");

const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials : true
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

app.get("/", AdminController.home);
app.get("/deleteAssociateOrder",AdminController.deleteAssociateOrder);
app.post("/deleteAssociateOrderProcess", AdminController.deleteAssociateOrderProcess);
app.post("/getRequests", UserController.getRequests);
app.post("/orderlist", OrderController.orderlist);
app.post("/register", UserController.register);
app.post("/request", OrderController.request);
app.post("/updateorder", OrderController.updateOrder);


app.listen(port, () => {console.log(`App is listening on port ${port} !`);});
