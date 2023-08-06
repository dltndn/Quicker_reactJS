import connectMongo from "../Connector";
import { ImageFileSchema, ImageFile } from "../Schemas/ImageFile";

export const findImageByOrderId = async (orderId: string) => {
  const conn = await connectMongo("orderComplete");
  const imageModel = conn.model(orderId, ImageFileSchema);
  const images = await imageModel.find();
  conn.destroy();
  return images;
};

export const saveImageToBufferString = async (orderNum: string, bufferImage : any) => {
  const conn = await connectMongo("orderComplete");
  const imageModel = conn.model(orderNum, ImageFile);
  const image = new imageModel(ImageFile);
  await image.save();
  conn.destroy();
};
