import chalk from "chalk";
import compression from "compression";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import * as fs from "node:fs";
import path from "node:path";

function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const logColorSetting = (res : Response ,date : string, status : string) => {
  date = chalk.green(date)
  if (res.statusCode < 400) {
    status = chalk.blue(status) 
  } else {
    status = chalk.red(status)
  }
  return {date : date, status : status}
}

morgan.token("all", function(req: Request, res: Response) {
  const ip = req.ip
  let date = formatDate(new Date())
  let status = res.statusCode.toString();
  const method = req.method
  const httpVersion = req.httpVersion
  const url = req.url
  const userAgent = req.headers["user-agent"]
  const result = `${date} | ${ip} | ${status} | HTTP/${httpVersion} [${method}] ${url} | ${userAgent}`

  const { date: updatedDate, status: updatedStatus } = logColorSetting(res, date, status);
  date = updatedDate;
  status = updatedStatus;
  
  process.stdout.write(`${date} | ${ip} | ${status} | HTTP/${httpVersion} [${method}] ${url} | ${userAgent}`+"\n")

  return result
});

const loader = {
  init : (app: Application) => {
    const cors = require("cors");
    const bodyParser = require("body-parser");
    const accessLogStream = fs.createWriteStream(path.join(__dirname, `../logs/${formatDateToYYYYMMDD(new Date())}.log`), {flags : "a"});
    const write = {
      write : (log : string) => {
        accessLogStream.write(log);
      }
    }
      
    app.use(morgan(':all' , {stream : write}));
    app.use(compression());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  
    return app;
  }

} 

export default loader