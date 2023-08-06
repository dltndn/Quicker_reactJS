import { User, Order } from "../Models/init-models";

export default {
  getUserId: (userWalletAddress: string) => {
    return User.findOne({
      attributes: ["id"],
      where: { wallet_address: userWalletAddress },
      raw: true,
      nest: true,
    });
  },

  getRequesterId: (orderId: number) => {
    return Order.findOne({
      attributes: ["id", "ID_REQ", "ID_DVRY"],
      where: { id: orderId },
    });
  },

  getUserName: (walletAddress: string) => {
    return User.findOne({
      attributes: ["name"],
      where: { wallet_address: walletAddress },
      raw: true,
    });
  },
};
