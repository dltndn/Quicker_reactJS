import { User, Image } from "../Models/init-models";
import { Birth_date, Join_date } from "../Models/init-models";

class UserModel {
  async register(userInstance: User,userBirthDate: Birth_date,hashed: string) {
    await User.create(userInstance);
    Birth_date.create(userBirthDate);
    Join_date.create({
      id: hashed,
      timeStamp: Math.floor(Date.now() / 100),
    });
    Image.create({ id: userInstance.id, imageId: "404" });
  }

  async getId(userWalletAddress: string) {
    return User.findOne({
      attributes: ["id"],
      where: { wallet_address: userWalletAddress },
      raw: true,
      nest: true,
    });
  }

  getName(walletAddress: string) {
    return User.findOne({
      attributes: ["name"],
      where: { wallet_address: walletAddress },
      raw: true,
    });
  }

  getImageId(userId: string) {
    return Image.findOne({
      attributes: ["imageId"],
      where: {
        id: userId,
      },
      nest: true,
      raw: true,
    });
  }

  updateImageId(userId: string, imageId: string) {
    return Image.update(
      { id: userId, imageId: imageId },
      { where: { id: userId } },
    );
  }
}

export default new UserModel()