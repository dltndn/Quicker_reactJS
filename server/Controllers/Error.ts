import {Request, Response, NextFunction } from "express"
import { SlackBot } from "../slackbot";
import index from "../config/index"

export const ErrorHander = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const token = index.slackBot.token;
  const channelId = index.slackBot.channelId;
  const slackbot = new SlackBot(token, channelId);
  slackbot.sendMessage(err);
  res.json({errorMessage : err.message});
  next();
}