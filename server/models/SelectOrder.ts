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

  getOrderlist: (id: number) => {
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    Order.hasOne(Recipient, { foreignKey: "id" });
    Order.hasOne(Sender, { foreignKey: "id" });

    return new Promise((resolve, reject) => {
      resolve(
        Order.findOne({
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
          ],
        })
      );

      reject("fail");
    });
  },

  getUserId : (data : any) => {
    return new Promise ((resolve, reject) => {
        resolve(
            User.findOne({
                attributes : ['id'],
                where: { wallet_address: data.userWalletAddress },
            })
        )
        reject("fail")
    })
  }
  
};
