import {
  Departure,
  Destination,
  Order,
  Recipient,
  Sender,
} from "./DB/init-models";

export = {
  getRoomInfo: async (orderNum: number) => {
    Order.hasOne(Sender, { foreignKey: "id", });
    Order.hasOne(Recipient, { foreignKey: "id", });
    Sender.hasOne(Departure, { foreignKey: "id", });
    Recipient.hasOne(Destination, { foreignKey: "id", });
    return new Promise((resolve, reject) => {
      resolve(
        Order.findOne({
            attributes : ["id"],
            where: {id : orderNum},
            include: [
              {
                model: Sender,
                attributes : ["PHONE"],
                include: [
                    {
                        model: Departure,
                        attributes : ["X", "Y"]
                    }
                ]
              },
              {
                model: Recipient ,
                attributes : ["PHONE"],
                include: [
                    {
                        model: Destination,
                        attributes : ["X", "Y"]
                    }
                ]
              },
            ],
        })
      );
      reject(undefined);
    });
  },
};
