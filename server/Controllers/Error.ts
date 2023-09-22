import {Request, Response, NextFunction } from "express"
import { SlackBot } from "../slackbot";
import keys from "../config/keys"
import { HTTPError } from "../types/http-error";



export const ErrorHander = (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 404 ) {
    res.send({error_message : err.message})
    next()
  }
  else {
    console.error(err)
    const token = keys.slackBot.token;
    const channelId = keys.slackBot.channelId;
    const slackbot = new SlackBot(token, channelId);
    slackbot.sendMessage(err);
    res.json({errorMessage : err.message});
    next();
  }
}