import { NHNAPI } from "./nhn-api";
import { TmapApi } from "./tmap";
import { SlackBot } from "./slackbot";
import { TwilioApi } from "./twilio-api";
import { KeyChecker } from "./key-validator";
import { Crypto } from "./cryto";
import { DateFomater } from "./dateFormat";
import config from "../config";

const keyChecker = new KeyChecker();
const nhn = keyChecker.checkObject(config.nhn);
const slack = keyChecker.checkObject(config.slackBot)
const twilio = keyChecker.checkObject(config.twilio);

const tmapApi = new TmapApi();
const cryptoInstance = new Crypto();
const dateFormater = new DateFomater();
const nhnApi = new NHNAPI(nhn);
const slackBot = new SlackBot(slack.token, slack.channelId);
const twilioApi = new TwilioApi(twilio);

export { tmapApi, nhnApi, slackBot, twilioApi, cryptoInstance, dateFormater };
