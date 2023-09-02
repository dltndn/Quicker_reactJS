import {Request, Response, NextFunction } from "express"
import { SlackBot } from "../slackbot";
import keys from "../config/keys"

export const ErrorHander = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const token = keys.slackBot.token;
  const channelId = keys.slackBot.channelId;
  const slackbot = new SlackBot(token, channelId);
  slackbot.sendMessage(err);
  res.json({errorMessage : err.message});
  next();
}