import { Request, Response, NextFunction } from "express";
import { SlackBot } from "../slackbot";
import config from "../config";
import { HTTPError } from "../types/http-error";

export class ErrorController {
  handler(err: HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err.status === 404) {
      res.send({ error_message: err.message });
      next();
    } else {
      console.error(err);
      const token = config.slackBot.token;
      const channelId = config.slackBot.channelId;
      const slackbot = new SlackBot(token, channelId);
      slackbot.sendMessage(err);
      res.json({ errorMessage: err.message });
      next();
    }
  }
}