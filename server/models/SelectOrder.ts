import {
  User,
  Transportation,
  Sender,
  Recipient,
  Destination,
  Departure,
  Product,
  Order,
} from "./DB/init-models";
const { Op } = require("sequelize");
export = {
  getRequests: (userId : string) => {
    console.log("USER_ID : ",userId)
    Order.hasOne(Transportation, { foreignKey: "id" });
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    Order.hasOne(Product, { foreignKey: "id" });
    return new Promise((resolve, reject) => {
      resolve(
        Order.findAll({
          attributes: ["id", "PAYMENT", "DETAIL"],
          where: {
            [Op.and]: [
              {
                ID_REQ: {
                  [Op.ne]: userId,
                },
              },
              {
                ID_DVRY: {
                  [Op.eq]: "",
                },
              },
            ],
          },
          include: [
            {
              model: Transportation,
              attributes: { exclude: ["ID", "id"] },
              required: false,
            },
            {
              model: Destination,
              attributes: { exclude: ["id"] },
              required: true,
            },
            {
              model: Departure,
              attributes: { exclude: ["ID", "id"] },
              required: true,
            },
            {
              model: Product,
              attributes: { exclude: ["ID", "id"] },
              required: false,
            },
          ],
        })
      );
      reject("fail");
    });
  },

  getOrderlist: (id: number) => {
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    Order.hasOne(Recipient, { foreignKey: "id" });
    Order.hasOne(Sender, { foreignKey: "id" });
    Order.hasOne(Product, {foreignKey: "id"})
    return new Promise((resolve, reject) => {
      resolve(
        Order.findAll({
          where: { id: id },
          attributes: ["id", "DETAIL"],
          include: [
            {
              model: Destination,
              attributes: { exclude: ["ID", "id"] },
              required: false,
            },
            {
              model: Departure,
              attributes: { exclude: ["ID", "id"] },
              required: false,
            },
            {
              model: Recipient,
              attributes: { exclude: ["ID", "id"] },
              required: false,
            },
            {
              model: Sender,
              attributes: { exclude: ["ID", "id"] },
              required: false,
            },
            {
              model: Product,
              attributes: { exclude: ["ID", "id"] },
              required: false,
            },
          ],
        })
      );

      reject( new Error ("message : fail"));
    });
  },
};
