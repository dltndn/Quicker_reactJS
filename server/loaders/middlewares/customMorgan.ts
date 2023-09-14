import { Response, Request } from "express"

import chalk from "chalk"
import morgan from "morgan"
import { formatDate } from "../../util/dateFormat"

import { CustomDataFormat } from "./types/customDataFormat"

const colorizeLog = (res : Response ,date : string, status : string) => {
  date = chalk.green(date)
  if (res.statusCode < 400) {
    status = chalk.blue(status) 
  } else {
    status = chalk.red(status)
  }
  return {date : date, status : status}
}

const filterConnectionInfoForLog = (req : Request, res :Response) => {
  return {
    ip : req.ip,
    date : formatDate(new Date()),
    status : res.statusCode.toString(),
    method : req.method,
    httpVersion : req.httpVersion,
    url : req.url,
    userAgent : req.headers["user-agent"],
  }
}

const customFormating = ({ip, date, status, method, httpVersion, url, userAgent} : CustomDataFormat) => {
  return `${date} | ${ip} | ${status} | HTTP/${httpVersion} [${method}] ${url} | ${userAgent}`
}

const showLog = (res :Response, {ip, date, status, method, httpVersion, url, userAgent} : CustomDataFormat) => {
  const { date: updatedDate, status: updatedStatus } = colorizeLog(res, date, status);
  date = updatedDate;
  status = updatedStatus;
  
  const result = customFormating({ip, date, status, method, httpVersion, url, userAgent})

  process.stdout.write(result+"\n")
}

// customFormating
export const customMorgan = morgan.token("custom", function(req: Request, res: Response) {
  // 데이터 처리하고
  const filterdInfo = filterConnectionInfoForLog(req, res)
  // 로그 문자열화 하고
  const formatedData = customFormating(filterdInfo)
  // 로그 띄우고
  showLog(res, filterdInfo)
  // 로그 리턴하고  
  return formatedData
});