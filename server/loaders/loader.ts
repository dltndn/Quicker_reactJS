import compression from "compression";
import express, { Application, NextFunction } from "express";
import * as fs from "node:fs";
import path from "node:path";

import { formatDateToYYYYMMDD } from "../util/dateFormat";
import { customMorgan } from "./middlewares/customMorgan";
import { calculateCostAverageInEveryMonth } from "./middlewares/cronJob";
const loader = {
  init : (app: Application) => {

    calculateCostAverageInEveryMonth
    const cors = require("cors");
    const bodyParser = require("body-parser");
    let writeStream : any;
    app.use((req, res,next : NextFunction) => {
      writeStream = fs.createWriteStream(path.join(__dirname, `../logs/${formatDateToYYYYMMDD(new Date())}.log`), {flags : "a"});
      next()
    })
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