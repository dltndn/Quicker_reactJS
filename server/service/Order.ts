import CreateChatRoom from "../Maria/Commands/CreateChatRoom";
import CreateOrder from "../Maria/Commands/CreateOrder";
import SelectOrder from "../Maria/Commands/SelectOrder";
import SelectUser from "../Maria/Commands/SelectUser";
import UpdateOrder from "../Maria/Commands/UpdateOrder";
import { findFailImageByOrderId, findImageByOrderId, saveFailImageToBufferString, saveImageToBufferString } from "../Mongo/Command/Image";

import { findLocation, saveLocation } from "../Mongo/Command/Location";
import connectMongo from "../Mongo/Connector";
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
  const connection = await connectMongo("realTimeLocation");
  await saveLocation(connection, address, loaction)
};

export const findCurrentLocation = async (query: any) => {
  const address = query.quicker;
  const connection = await connectMongo("realTimeLocation");
  const location = await findLocation(connection, address)  
  return location;
};

export const createOrder = async (body : any) => {
  const walletAddress = body.userWalletAddress
  const userId = await SelectUser.getUserId(walletAddress);
  if (userId) {
    body.Order.ID_REQ = userId.id;
    await CreateOrder.Order(body);
  } else {
    throw new Error("회원이 아님")
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
  UpdateOrder.cacheOrder(orderId)

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
  const connection = await connectMongo("orderComplete");
  const images = await findImageByOrderId(connection, orderId)
  return {imageBuffer : images[0].image}
}

export const saveImage =async (body:any, documentFile : any) => {
  const orderNum = body.orderNum
  const bufferImage = documentFile.buffer
  const connection = await connectMongo("orderComplete");
  await saveImageToBufferString(connection, orderNum, bufferImage)
}

export const findUserOrdersDetail = async (query: any) => {
  const orderIds : string = query.orderIds
  const list = JSON.parse(`[${orderIds}]`)
  
  const orders = await SelectOrder.getOrderlist(list);
  return orders
}

export const findFailImage =async (query:any) => {
  const orderId = query.orderNum;
  const connection = await connectMongo("orderFail");
  const image = await findFailImageByOrderId(connection, orderId)
  return image
}

export const saveFailImage =async (body:any , documentFile : Express.Multer.File | undefined) => {
  if (documentFile === undefined) {
    return "picture not exist"
  }
  const bufferImage = documentFile.buffer;
  const orderNum = body.orderNum;
  const reason = body.reason;
  const connection = await connectMongo("orderFail");
  await saveFailImageToBufferString(connection, orderNum, bufferImage, reason)
  return "done"
}