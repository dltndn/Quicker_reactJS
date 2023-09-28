import { Departure, Destination, Order } from "../Models/init-models";

class LocationModel {
  find(orderId: number) {
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    return Order.findOne({
      attributes: ["id"],
      where: { id: orderId },
      include: [
        {
          model: Destination,
          attributes: { exclude: ["id", "DETAIL"] },
          required: true,
        },
        {
          model: Departure,
          attributes: { exclude: ["ID", "id", "DETAIL"] },
          required: true,
        },
      ],
      raw: true,
      nest: true,
    });
  }

  findAll(orderIds: number[]) {
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    return Order.findAll({
      attributes: ["id"],
      where: { id: orderIds },
      include: [
        {
          model: Destination,
          attributes: { exclude: ["id", "DETAIL"] },
          required: true,
        },
        {
          model: Departure,
          attributes: { exclude: ["ID", "id", "DETAIL"] },
          required: true,
        },
      ],
      raw: true,
      nest: true,
    });
  }
}

export default new LocationModel()