require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendURLToReceiver = async (editedPhoneNumber : String, url : String) => {
  try {
    const message = await client.messages.create({
      body: url,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+82" + editedPhoneNumber,
    });
    console.log(message);
  } catch (error) {
    // You can implement your fallback code here
    console.error(error);
  }
}

export default sendURLToReceiver;