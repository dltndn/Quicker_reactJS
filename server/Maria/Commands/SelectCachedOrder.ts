import { CacheMatchedOrder } from "../Models/CacheMatchedOrder";

export const findAllCachedOrderIdByOrderId = (orderId: number) => {
  return CacheMatchedOrder.findAll({
    where: {
      id: orderId,
    },
    raw: true,
    nest: true,
  });
};
