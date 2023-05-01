import {Transportation, Sender, Recipient, Destination, Departure, Product, Order, Chat_room } from "../DB/init-models";

export = {
  deleteOrder: async (OrderId: number) => {
    await Chat_room.destroy({ where: { chat_order_id: OrderId } });
    await Transportation.destroy({ where: { ID: OrderId } }); 
    await Sender.destroy({ where: { ID: OrderId } });
    await Recipient.destroy({ where: { id: OrderId } });
    await Destination.destroy({ where: { id: OrderId } });
    await Departure.destroy({ where: { ID: OrderId } });
    await Product.destroy({ where: { ID: OrderId } });
    await Order.destroy({ where: { id: OrderId } });
  },
};