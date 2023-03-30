import { User, Birth_date, Join_date ,Order,Transportation,Destination,Departure,Product,Sender,Recipient} from "./DB/init-models";

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

  Order: (data: any) => {
    return new Promise((resolve, reject) => {
      resolve(() => {
        Order.create(data.Order);
        Transportation.create(data.Transportation);
        Destination.create(data.Destination);
        Departure.create(data.Departure);
        Product.create(data.Product);
        Sender.create(data.Sender);
        Recipient.create(data.Recipient);
      });
      reject("fail");
    });
  },
};
