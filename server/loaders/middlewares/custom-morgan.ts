import { Request, Response } from "express";

import chalk from "chalk";
import morgan from "morgan";
import * as fs from "node:fs";
import path from "node:path";

import { formatDate, formatDateToYYYYMMDD } from "../../util/dateFormat";

import { CustomFormat } from "./types/customDataFormat";

const colorizeLog = (date: string, status: number) => {
  date = chalk.green(date);
  let colorStatus = status.toString()
  if (status < 400) {
    colorStatus = chalk.cyan.bold(colorStatus);
  } else {
    colorStatus = chalk.red.bold(colorStatus);
  }
  return { date: date, status: colorStatus };
};

const filterConnectionInfoForLog = (req: Request, res: Response) => {
  return {
    ip: req.ip,
    date: formatDate(new Date()),
    status: res.statusCode,
    method: req.method,
    httpVersion: req.httpVersion,
    url: req.originalUrl,
    userAgent: req.headers["user-agent"],
  };
};

const customFormating = ({
  ip,
  date,
  status,
  method,
  httpVersion,
  url,
  userAgent,
}: CustomFormat) => {
  return `${date} | ${ip} | ${status} | HTTP/${httpVersion} [${method}] ${url} | ${userAgent}`;
};

const showLog = ({ ip, date, status, method, httpVersion, url, userAgent }: CustomFormat ) => {
  if (typeof status === "number") {
    const { date: updatedDate, status: updatedStatus } = colorizeLog(date, status);
  
    const result = customFormating({
      ip,
      date : updatedDate,
      status : updatedStatus,
      method,
      httpVersion,
      url,
      userAgent 
    });
  
    process.stdout.write(result + "\n");
  }
};

morgan.token("custom", function (req: Request, res: Response) {
  const filterdInfo = filterConnectionInfoForLog(req, res);
  showLog(filterdInfo);
  return customFormating(filterdInfo);
});

const writeStream = fs.createWriteStream(path.join(__dirname, `../../logs/${formatDateToYYYYMMDD(new Date())}.log`), { flags: "a" });

const option = { stream: { write: (log: string) => writeStream.write(log) } };

export const customMorgan = () => morgan(":custom", option);