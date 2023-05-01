import { Chat_room } from "./DB/init-models";

export = {
  createChatRoom: (orderId: number, deliverId: string, requesterId: string) => {
    return new Promise(async (resolve, reject) => {
      await Chat_room.create({
        chat_order_id: orderId,
        request_id: requesterId,
        delivery_id: deliverId,
      });

      resolve("done");
      reject("fail");
    });
  },
};
