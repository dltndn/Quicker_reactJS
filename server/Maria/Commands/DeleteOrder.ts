import {Transportation, Sender, Recipient, Destination, Departure, Product, Order, Chat_room, CacheMatchedOrder } from "../Models/init-models";

export default {
  deleteOrder: async (OrderId: number) => {
    await CacheMatchedOrder.destroy({where : {id: OrderId}})
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