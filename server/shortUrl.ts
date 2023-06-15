require("dotenv").config();

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;
// console.log(client_id, client_secret)
const query = encodeURI("https://developers.naver.com/docs/utils/shortenurl");

const api_url = 'https://naveropenapi.apigw.ntruss.com/util/v1/shorturl';
const request = require('request');
const options = {
  url: api_url,
  form: { url: query },
  headers: { 'X-NCP-APIGW-API-KEY-ID': client_id, 'X-NCP-APIGW-API-KEY': client_secret },
};

// @ts-ignore
request.get(options, function(error, response , body ) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  } else {
    console.log(response)
    console.log('error = ' + response.statusCode);
  }
});