require('dotenv').config()

const mariadb = require("mariadb");
const env = process.env

export = mariadb.createPool({
  host: env.host,
  user: env.user,
  port: env.port,
  password: env.password,
  connectionLimit: env.connectionLimit,
});
