import express, { Application, Request, Response } from "express";
import connector from "./DataBaseConnector" 

const app: Application = express();
const cors = require("cors");
const port: number = 9000;
const bodyParser = require("body-parser");

async function asyncFunction() {
  let conn;
  try {
    conn = await connector.getConnection();
    const rows = await conn.query("SELECT * FROM Quicker.User;");
    console.log(rows); //[ {val: 1}, meta: ... ]
    const res = await conn.query(
      "INSERT INTO Quicker.User (wallet_adress, name, email, contact) VALUES (?, ?, ?, ?)",
      ["walletadress", "username", "emailadress", "contact"]
    );
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    
  res.send(`<button onclick="location.href='/db'">DB</button>`);
});

app.get("/db", (req: Request, res: Response) => {
    console.log('done')
    asyncFunction()
    res.redirect(`/`);
});

app.get("/get", (req: Request, res: Response) => {
  res.send({ msg: "Testmsg" });
});

app.post("/post", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ msg: "done" });
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
