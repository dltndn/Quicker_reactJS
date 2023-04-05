import {Transportation, Sender, Recipient, Destination, Departure, Product, Order } from "./DB/init-models";

export = {
  deleteOrder: (OrderId: number) => {
    Transportation.destroy({ where: { ID: OrderId } });
    Sender.destroy({ where: { ID: OrderId } });
    Recipient.destroy({ where: { id: OrderId } });
    Destination.destroy({ where: { id: OrderId } });
    Departure.destroy({ where: { ID: OrderId } });
    Product.destroy({ where: { ID: OrderId } });
    Order.destroy({ where: { id: OrderId } });
  },
};



