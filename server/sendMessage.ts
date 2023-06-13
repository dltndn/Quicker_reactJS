require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const userNumber = "상대방 번호";
(async () => {
  try {
    const message = await client.messages.create({
      body: "testMessage",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+82" + userNumber,
    });
    console.log(message);
  } catch (error) {
    // You can implement your fallback code here
    console.error(error);
  }
})();
