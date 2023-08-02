import { Chat_room } from "../Models/init-models";

export default {
  createChatRoom: (orderId: number, deliverId: string, requesterId: string) => {
    return Chat_room.create({
      chat_order_id: orderId,
      request_id: requesterId,
      delivery_id: deliverId,
    });
  },
};
