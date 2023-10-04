require("dotenv").config();

const { Sequelize } = require("sequelize");
const env : NodeJS.ProcessEnv = process.env;

export default new Sequelize("Quicker", env.user, env.password, {
  dialect: "mariadb",
  host: env.host,
  port: env.port,
  logging: false
});
