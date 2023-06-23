import { User, Birth_date, Join_date } from "../Models/init-models";

export default {
  registerUser: (userInstance: any, userBirthDate: any, hashed: any) => {
    return new Promise(async (resolve, reject) => {
        await User.create(userInstance);
        await Birth_date.create(userBirthDate);
        await Join_date.create({
          id: hashed,
          timeStamp: Math.floor(Date.now() / 100),
        });
        resolve("done");
        reject("fail");
      }
    );
  },
};
