import express, { Application, Request, Response } from "express";
import connector from "./DataBaseConnector";
import sequelize from "./sequelizeConnector";
import { initModels, User, Birth_date, Join_date } from "./models/DB/init-models";

initModels(sequelize);

const cors = require("cors");
const http = require("http");
const io = require('socket.io');
const app: Application = express();
const port: Number = 9000;
const httpServer = http.createServer(app).listen(9001);
const bodyParser = require("body-parser");
const { Sequelize, DataTypes, Op } = require("sequelize");
const crypto = require('crypto');

const socketServer = io(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});

app.use(cors());
require("dotenv").config();

app.use(bodyParser.json());


let roomName = "testroom"
// socketServer.on('connect');
let sockets : Array<Object> = []
socketServer.on('connect', (socket : any) => {
	sockets.push(socket)
	socket.join(roomName);
	socket.on('sendMessage', (message : MessageObejct, done : Function) => {
		socket.to(roomName).emit("sendMessage", message.data);
    console.log(message.data)
		done();
		// done()
	});
});

interface MessageObejct {
  data : String
}








app.get("/", (req: Request, res: Response) => {
  res.send(`
    <button onclick="location.href='/db'">DB</button>
    <button onclick="location.href='/del'">del</button>
    <button onclick="location.href='/createTable'">createTable</button>
    
  `);
});
app.post("/register", async (req: Request, res: Response) => {
  try {
    const secret = process.env.cryptoKey
    const userInstance = req.body.User
    const userBirthDate = req.body.Birthday
    //NOTE : 전화번호를 기반으로 암호화한 id 사용
    const hashed = crypto.createHmac('sha256', secret).update(userInstance.contact).digest('hex');
    userInstance.id = hashed
    userBirthDate.id = hashed
    
    await User.create(userInstance);
    await Birth_date.create(userBirthDate);
    await Join_date.create({id : hashed, timeStamp: Math.floor(Date.now()/100)})
    return res.send({ msg: "done" });
  } catch (error) {
    res.send(error)
  }
});

app.get("/conn", (req: Request, res: Response) => {
  console.log("done");
  res.redirect(`/`);
});
app.get("/del", async (req: Request, res: Response) => {
  let users = await User.findAll();
  let firstUserId = users[0].dataValues.id
  console.log(firstUserId)
  await Join_date.destroy({where : {id : firstUserId}});
  await Birth_date.destroy({where : {id : firstUserId}});
  await User.destroy({where : {id : firstUserId}});
  
  res.redirect(`/`);
});

app.get("/db", (req: Request, res: Response) => {
  console.log("done");
  res.redirect(`/`);
});

app.get("/get", (req: Request, res: Response) => {
  res.send({ msg: "Testmsg" });
});

app.post("/post", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ msg: "done" });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
