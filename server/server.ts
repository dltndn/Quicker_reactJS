// 필요한 모듈 import
import compression from "compression";
import express, { Application } from "express";
import morgan from "morgan";
import chat from "./chat/socket";

import AssociateOrder from "./routes/AssociateOrder";
import CurrentLocation from "./routes/CurrentLocation";
import Home from "./routes/Home";
import Order from "./routes/Order";
import Orders from "./routes/Orders";
import Register from "./routes/Register";
import Room from "./routes/Room";
import User from "./routes/User";
// 설정
const cors = require("cors");
const app: Application = express();
const HTTP_PORT = (process.env.NODE_ENV === "development") ? process.env.HTTP_LOCAL_SERVER_PORT : process.env.HTTP_AWS_SERVER_PORT;
const bodyParser = require("body-parser");

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
app.use("/room", Room)
app.use("/user", User)
app.use("/order", Order)
app.use("/orders", Orders);
app.use("/register", Register);

/**
 * @TODO : 안드로이드 라우터 코드 수정
 */ 
app.use("/current-deliver-location", CurrentLocation);

const server = app.listen(HTTP_PORT, () => console.log(`App is listening on port ${HTTP_PORT} !`));

chat(server)