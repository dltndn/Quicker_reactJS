import { User, Birth_date, Join_date } from "../Models/init-models";

export default {
  registerUser: async (userInstance: User, userBirthDate: Birth_date, hashed: string) => {
    await User.create(userInstance);
    await Birth_date.create(userBirthDate);
    await Join_date.create({
      id: hashed,
      timeStamp: Math.floor(Date.now() / 100),
    });
  },
};
