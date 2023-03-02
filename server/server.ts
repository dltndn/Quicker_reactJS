import express, { Application, Request, Response } from "express";
import sequelize from "./sequelizeConnector";

const cors = require("cors");
const app: Application = express();
const port: number = 9000;
const bodyParser = require("body-parser");
const { Sequelize, DataTypes, Op } = require("sequelize");

app.use(cors());
app.use(bodyParser.json());


let connectDBWithsequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <button onclick="location.href='/db'">DB</button>
    <button onclick="location.href='/conn'">SQ</button>
    <button onclick="location.href='/createTable'">createTable</button>
  `);
});
app.post("/register", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ msg: "done" });
});

app.get("/conn", (req: Request, res: Response) => {
  console.log("done");
  connectDBWithsequelize();
  res.redirect(`/`);
});

app.get("/createTable", (req: Request, res: Response) => {
  let create = async () => {
    
    const test = sequelize.define("test", {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    });
    await test.sync();
    // insert
    await test.create({ firstName: "lee" })
    
    // Change everyone without a last name to "Doe"
    await test.update(
      { 
        firstName: "dan" 
      }, 
      {
        where: {
          firstName: {
            [Op.or]: ['lee', 'kim'], 
          }
          
        }
      }
    );

    // select
    // let a = await test.findAll();
    let a = await test.findAll({
      attributes: ['firstName']
    });

    console.log(a)

    // console.log(a)
    // await jane.save()
  };

  create();

  // const test = sequelize.define("test", {
  //   // Model attributes are defined here
  //   firstName: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   lastName: {
  //     type: DataTypes.STRING,
  //     // allowNull defaults to true
  //   },
  // });

  // test.drop()

  res.redirect(`/`);
});

app.get("/db", (req: Request, res: Response) => {
  console.log("done");
  // asyncFunction()
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
