import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Quicker", "root", "11111111", {
  dialect: "mariadb",
  host: "localhost",
  port: 3306,
  logging: false,
});
