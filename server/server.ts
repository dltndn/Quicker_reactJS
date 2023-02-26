import express, { Application, Request, Response } from "express";
import connector from "./DataBaseConnector" 
import sequelize from "./DBConnector"

const cors = require("cors");
const app: Application = express();
const port: number = 9000;
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json());

// async function asyncFunction() {
//   let conn;
//   try {
//     conn = await connector.getConnection();
//     const rows = await conn.query("SELECT * FROM Quicker.User;");
//     console.log(rows); //[ {val: 1}, meta: ... ]
//     const res = await conn.query(
//       "INSERT INTO Quicker.User (wallet_adress, name, email, contact) VALUES (?, ?, ?, ?)",
//       ["walletadress", "username", "emailadress", "contact"]
//     );
//     console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) return conn.end();
//   }
// }

let connectDBWithsequelize = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }  
}

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <button onclick="location.href='/db'">DB</button>
    <button onclick="location.href='/conn'">SQ</button>
  `);
});

app.get("/conn", (req: Request, res: Response) => {
  console.log('done')
  connectDBWithsequelize()
  res.redirect(`/`);
});

app.get("/db", (req: Request, res: Response) => {
    console.log('done')
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
