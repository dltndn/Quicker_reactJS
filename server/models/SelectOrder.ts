import {
  Transportation,
  Sender,
  Recipient,
  Destination,
  Departure,
  Product,
  Order,
} from "./DB/init-models";

export = {
  checkJoin: () => {
    Order.hasOne(Transportation, { foreignKey: "id" });
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    Order.hasOne(Product, { foreignKey: "id" });
    return new Promise((resolve, reject) => {
      resolve(
        Order.findAll({
          attributes: ["id", "PAYMENT", "DETAIL"],
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
};
