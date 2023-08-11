import { Order } from "../Models/init-models";

export default {
  updateOrder: async (userId: string, orderId: number) => {
    return Order.update(
      { ID_DVRY: userId },
      {
        where: {
          id: orderId,
        },
      }
    );
  },
};
