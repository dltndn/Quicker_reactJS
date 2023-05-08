import { User, Order } from "./DB/init-models";

export = {
  getUserId: (userWalletAddress: string) => {
    return new Promise((resolve, reject) => {
      resolve(
        User.findOne({
          attributes: ["id"],
          where: { wallet_address: userWalletAddress },
        })
      );
      reject("fail");
    });
  },

  getRequesterId: (orderId: number) => {
    return new Promise((resolve, reject) => {
      resolve(
        Order.findOne({
          attributes: ["id", "ID_REQ", "ID_DVRY"],
          where: { id: orderId },
        })
      );
      reject("fail");
    });
  },

  getUserName: (walletAddress: string) => {
    return new Promise((resolve, reject) => {
      resolve(
        User.findOne({
          attributes: ["name"],
          where: { wallet_address: walletAddress},
        })
      );
      reject("fail");
    });
  },
};
