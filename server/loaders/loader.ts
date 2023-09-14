import compression from "compression";
import express, { Application } from "express";
import * as fs from "node:fs";
import path from "node:path";

import { formatDateToYYYYMMDD } from "../util/dateFormat";
import { customMorgan } from "./middlewares/customMorgan";


const loader = {
  init : (app: Application) => {
    
    const cors = require("cors");
    const bodyParser = require("body-parser");
    const writeStream = fs.createWriteStream(path.join(__dirname, `../logs/${formatDateToYYYYMMDD(new Date())}.log`), {flags : "a"});
    const logWriter = {write : (log : string) => writeStream.write(log)}

    app.use(customMorgan(':custom', {stream : logWriter}))
    app.use(compression());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  
    return app;
  }

} 

export default loader