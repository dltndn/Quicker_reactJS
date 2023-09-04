import { Connection } from "mongoose";
import { ImageFileSchema, ImageFile } from "../Schemas/ImageFile";

export const findImageByOrderId = async (connection : Connection, orderId: string) => {
  const imageModel = connection.model(orderId, ImageFileSchema);
  const images = await imageModel.find();
  connection.destroy();
  return images;
};

export const saveImageToBufferString = async (connection : Connection, orderNum: string, bufferImage : any) => {
  const imageModel = connection.model(orderNum, ImageFile);
  const image = new imageModel({image:bufferImage});
  await image.save();
  connection.destroy();
};
