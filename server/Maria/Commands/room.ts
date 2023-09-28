import {Departure,Destination,Order,Recipient,Sender,Chat_room} from "../Models/init-models";

class RoomModel {
  create(orderId: number, deliverId: string, requesterId: string) {
    return Chat_room.create({
      chat_order_id: orderId,
      request_id: requesterId,
      delivery_id: deliverId,
    });
  }
  async get(orderNum: number) {
    Order.hasOne(Sender, { foreignKey: "id" });
    Order.hasOne(Recipient, { foreignKey: "id" });
    Sender.hasOne(Departure, { foreignKey: "id" });
    Recipient.hasOne(Destination, { foreignKey: "id" });
    return Order.findOne({
      attributes: ["id"],
      where: { id: orderNum },
      include: [
        {
          model: Sender,
          attributes: ["PHONE"],
          include: [
            {
              model: Departure,
              attributes: ["X", "Y"],
            },
          ],
        },
        {
          model: Recipient,
          attributes: ["PHONE"],
          include: [
            {
              model: Destination,
              attributes: ["X", "Y"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });
  }
}

export default new RoomModel()
