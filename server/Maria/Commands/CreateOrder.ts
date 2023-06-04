import {Order,Transportation,Destination,Departure,Product,Sender,Recipient} from "../Models/init-models";

export default {
  Order: (data: any) => {
    return new Promise((resolve, reject) => {
      Order.create(data.Order);
      Transportation.create(data.Transportation);
      Destination.create(data.Destination);
      Departure.create(data.Departure);
      Product.create(data.Product);
      Sender.create(data.Sender);
      Recipient.create(data.Recipient);
      resolve("done");
      reject("fail");
    });
  },
};
