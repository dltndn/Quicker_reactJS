require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const env : NodeJS.ProcessEnv = process.env;

export = new Sequelize("Quicker", env.user, env.password, {
  dialect: "mariadb",
  host: env.host,
  port: env.port,
});
