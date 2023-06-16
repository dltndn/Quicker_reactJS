require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const messageTemplate = `\n[Quicker]\n\n반갑습니다, 고객님.\n고객님의 소중한 상품이 배송 예정입니다.\n\n※ 실시간 배송정보\n`;

const sendURLToReceiver = async (phoneNumber: string, url : string) => {
  try {
    const message = await client.messages.create({
      body: messageTemplate + url,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+82" + phoneNumber,
    });
    console.log(message);
  } catch (error) {
    console.error(error);
  }
} 

export default sendURLToReceiver;
