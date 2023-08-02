import CreateChatRoom from "../Maria/Commands/CreateChatRoom";
import CreateOrder from "../Maria/Commands/CreateOrder";
import SelectOrder from "../Maria/Commands/SelectOrder";
import SelectUser from "../Maria/Commands/SelectUser";
import UpdateOrder from "../Maria/Commands/UpdateOrder";
import { findImageByOrderId } from "../Mongo/Command/FindImage";

import { saveLocation, findLocation } from "../Mongo/Command/Location";
import { encrypt } from "../lib/cryto";
import sendMessage from "../sendMessage";


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

export const updateOrder = async (body:any) => {
  const userWalletAddress = body.userWalletAddress;
  const orderId = body.orderId;

  const deliver = await SelectUser.getUserId(userWalletAddress);

  if (deliver === null) {
    throw new Error("회원이 아님")
  }

  await UpdateOrder.updateOrder(deliver.id, orderId)
  
  const requesterId = await SelectUser.getRequesterId(orderId);

  if (requesterId === null) {
    throw new Error("의뢰인 아이디를 찾을 수 없습니다.")
  }

  await CreateChatRoom.createChatRoom(orderId, deliver.id, requesterId.ID_REQ)
  
  const receiverPhoneNumber = await SelectOrder.receiverPhoneNumber(orderId)

  if (receiverPhoneNumber === null) {
    throw new Error("수취인의 전화번호에 대한 정보가 없습니다.")
  }
  const encryptedUrl = encrypt(body)

  const url = process.env.CLIENT_SERVER_DOMAIN + "receipient/?key=" + encryptedUrl
  
  await sendMessage(receiverPhoneNumber.PHONE, url)  
  
}

export const findImage =async (query: any) => {
  const orderId = query.orderNum;
  const images = await findImageByOrderId(orderId)
  return {imageBuffer : images[0].image}
}