import express, { Application, Request, Response } from "express";
import connector from "./DataBaseConnector";
import sequelize from "./sequelizeConnector";
import { initModels, User } from "./models/init-models";

initModels(sequelize);

const cors = require("cors");
const app: Application = express();
const port: number = 9000;
const bodyParser = require("body-parser");
const { Sequelize, DataTypes, Op } = require("sequelize");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <button onclick="location.href='/db'">DB</button>
    <button onclick="location.href='/conn'">SQ</button>
    <button onclick="location.href='/createTable'">createTable</button>
  `);
});
app.post("/register", async (req: Request, res: Response) => {
  const userInstance = req.body.User
  // console.log(userInstance)
  await User.create(userInstance);

  res.send({ msg: "done" });
});

app.get("/conn", (req: Request, res: Response) => {
  console.log("done");
  res.redirect(`/`);
});

app.get("/createTable", (req: Request, res: Response) => {
  

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
