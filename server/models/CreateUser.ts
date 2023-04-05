import { User, Birth_date, Join_date } from "./DB/init-models";

export = {
  registerUser: (userInstance: any, userBirthDate: any, hashed: any) => {
    return new Promise((resolve, reject) => {
      resolve(() => {
        User.create(userInstance);
        Birth_date.create(userBirthDate);
        Join_date.create({
          id: hashed,
          timeStamp: Math.floor(Date.now() / 100),
        });
      });
      reject("fail");
    });
  },
  
};
