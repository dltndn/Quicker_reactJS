import {Transportation, Sender, Recipient, Destination, Departure, Product, Order } from "./DB/init-models";

export = {
  deleteOrder: async (OrderId: number) => {
    await Transportation.destroy({ where: { ID: OrderId } });
    await Sender.destroy({ where: { ID: OrderId } });
    await Recipient.destroy({ where: { id: OrderId } });
    await Destination.destroy({ where: { id: OrderId } });
    await Departure.destroy({ where: { ID: OrderId } });
    await Product.destroy({ where: { ID: OrderId } });
    await Order.destroy({ where: { id: OrderId } });
  },
};



