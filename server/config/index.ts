import dotenv from "dotenv"
dotenv.config()

export default {
  db: {
    maria: {
      host: process.env.host,
      user: process.env.user,
      port: process.env.port,
      password: process.env.password,
    },
    mongo: process.env.MONGO_CHAT,
  },
  crypto: {
    key: process.env.cryptoKey,
    url: process.env.URL_CRYPTO_KEY,
  },
  nodeenv: process.env.NODE_ENV,
  server: {
    aws: {
      http: process.env.HTTP_AWS_SERVER_PORT,
      https: process.env.HTTPS_AWS_SERVER_PORT,
    },
    local: {
      http: process.env.HTTP_LOCAL_SERVER_PORT,
      https: process.env.HTTPS_LOCAL_SERVER_PORT,
    },
  },
  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_AUTH_TOKEN,
    phonenumber: process.env.TWILIO_PHONE_NUMBER,
    testphoneNumber: process.env.PHONE_NUMBER1,
  },
  clientdomain: process.env.CLIENT_SERVER_DOMAIN,
  test: {
    USER_WALLET: process.env.USER_WALLET,
    REQUESTER_WALLET : process.env.REQUESTER_WALLET
  },
  klaytn: {
    BAOBAB_PROVIDER: process.env.KLAYTN_BAOBAB_PROVIDER,
    ACCESSKEY_ID: process.env.KLAYTN_ACCESSKEY_ID,
    SECRET_KEY: process.env.KLAYTN_SECRET_KEY,
  },
  slackBot : {
    token : process.env.TOKEN,
    channelId : process.env.CHANNEL_ID
  },
  tmap : {
    apiKey : process.env.TMAP_API_KEY
  },
  nhn : {
    accessKey : process.env.ACCESSKEY,
    secretKey : process.env.SECRETKEY,
    serviceId : process.env.SERVICEID,
  }
};
