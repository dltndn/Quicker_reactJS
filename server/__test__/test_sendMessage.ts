import sendURLToReceiver from "../sendMessage";

require("dotenv").config();

if (process.env.PHONE_NUMBER1 && process.env.PHONE_NUMBER2 !== undefined) {
    sendURLToReceiver(process.env.PHONE_NUMBER1, "테스트 url");
    sendURLToReceiver(process.env.PHONE_NUMBER2, "테스트 url");
} else {
    throw new Error(".env 확인 필요")
}
