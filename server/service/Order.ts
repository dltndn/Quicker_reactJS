import CacheOrderModel from "../Maria/Commands/cache-order";
import OrderModel from "../Maria/Commands/order";
import RoomModel from "../Maria/Commands/room";
import UserModel from "../Maria/Commands/user";

import { encrypt } from "../lib/cryto";
import sendMessage from "../sendMessage";

const roomInstance = new RoomModel()
const cachedOrderInstance = new CacheOrderModel()
const userInstance = new UserModel()
const orderModel = new OrderModel()

export const updateOrder = async (body: any) => {
  const userWalletAddress = body.userWalletAddress;
  const orderId = body.orderId;

  const deliver = await userInstance.findId(userWalletAddress);

  if (deliver === null) {
    throw new Error("회원이 아님");
  }

  await orderModel.update(deliver.id, orderId);
  cachedOrderInstance.create(orderId);

  const requesterId = await orderModel.findRequesterId(orderId);

  if (requesterId === null) {
    throw new Error("의뢰인 아이디를 찾을 수 없습니다.");
  }

  await roomInstance.create(orderId, deliver.id, requesterId.ID_REQ);

  const receiverPhoneNumber = await orderModel.findReceiverPhoneNumber(orderId);

  if (receiverPhoneNumber === null) {
    throw new Error("수취인의 전화번호에 대한 정보가 없습니다.");
  }
  const encryptedUrl = encrypt(body);

  const url =
    process.env.CLIENT_SERVER_DOMAIN + "receipient/?key=" + encryptedUrl;

  await sendMessage(receiverPhoneNumber.PHONE, url);
};

export const classifyDistance = async (query: any) => {
  type Distance =
    | "5KM"
    | "10KM"
    | "15KM"
    | "20KM"
    | "25KM"
    | "30KM"
    | "40KM"
    | "50KM"
    | "60KM"
    | "60+KM";
  let classifiedDistance: Distance = "5KM";
  const distance: number = query.distance;
  // @TODO : 중복제거
  const classifyDistance = (distance: number) => {
    const listDistance = [5, 10, 15, 20, 25, 30, 40, 50, 60];
    for (const distanceUnit of listDistance) {
      if (distance <= distanceUnit) {
        return (distanceUnit + "KM") as Distance;
      } else if (60 < distance) {
        return "60+KM" as Distance;
      }
    }
  };
  classifiedDistance = classifyDistance(distance) as Distance;
  return classifiedDistance;
};