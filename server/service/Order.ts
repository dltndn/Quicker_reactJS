import CreateOrder from "../Maria/Commands/CreateOrder";
import SelectOrder from "../Maria/Commands/SelectOrder";
import SelectUser from "../Maria/Commands/SelectUser";

import { saveLocation, findLocation } from "../Mongo/Command/Location";


export const findDestinationAndDepartureByOrderId = async (query: any) => {
  const orderId = query.orderid;
  const instance = await SelectOrder.location(parseInt(orderId));
  return instance;
};

export const findOrdersByWalletAddress = async (query: any) => {
  const userWalletAddress = query.userWalletAdress;
  const userId = await SelectUser.getUserId(userWalletAddress);
  if (userId === null) {
    throw new Error("Not exist name");
  }
  const orders = await SelectOrder.getRequests(userId.id);
  return orders;
};

export const postCurrentLocation = async (body: any) => {
  const address = body.address;
  const loaction = { 
    X: body.X,
    Y: body.Y,
  }
  await saveLocation(address, loaction)
};

export const findCurrentLocation = async (query: any) => {
  const address = query.quicker;
  const location = await findLocation(address)  
  return location;
};

export const createOrder = async (body : any) => {
  const walletAddress = body.userWalletAddress
  const userId = await SelectUser.getUserId(walletAddress);
  if (userId) {
    body.Order.ID_REQ = userId.id;

    await CreateOrder.Order(body);

    return { msg: "done" }
  } else {
    return new Error("회원이 아님")
  }
}