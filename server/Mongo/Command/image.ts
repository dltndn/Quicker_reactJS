import { Connection } from "mongoose";
import { ImageFileSchema, ImageFile } from "../Schemas/ImageFile";

// export const findImageByOrderId = async (connection : Connection, orderId: string) => {
//   const imageModel = connection.model(orderId, ImageFileSchema);
//   const images = await imageModel.find();
//   connection.destroy();
//   return images;
// };

// export const saveImageToBufferString = async (connection : Connection, orderNum: string, bufferImage : any) => {
//   const imageModel = connection.model(orderNum, ImageFile);
//   const image = new imageModel({image:bufferImage});
//   await image.save();
//   connection.destroy();
// };

// export const findFailImageByOrderId = async (connection : Connection, orderId: string) => {
//   const uploadImage = connection.model(orderId, ImageFileSchema);
//   const [ image ] = await uploadImage.find().sort("desc").limit(1);
//   connection.destroy();
//   return image;
// };

// export const saveFailImageToBufferString = async (connection : Connection, orderNum: string, bufferImage : any, reason : string) => {
//   const uploadImage = connection.model(orderNum, ImageFileSchema);
//   const image = new uploadImage({
//     image: bufferImage,
//     reason: reason,
//   });
//   await image.save();
//   connection.destroy();
// };

export class ImageModel {
  async find (connection : Connection, orderId: string) {
    const imageModel = connection.model(orderId, ImageFileSchema);
    const images = await imageModel.find();
    connection.destroy();
    return images;
  };
  
  async create (connection : Connection, orderNum: string, bufferImage : any) {
    const imageModel = connection.model(orderNum, ImageFile);
    const image = new imageModel({image:bufferImage});
    await image.save();
    connection.destroy();
  };
  
  async findFailImage (connection : Connection, orderId: string) {
    const uploadImage = connection.model(orderId, ImageFileSchema);
    const [ image ] = await uploadImage.find().sort("desc").limit(1);
    connection.destroy();
    return image;
  };
  
  async createFailImage (connection : Connection, orderNum: string, bufferImage : any, reason : string) {
    const uploadImage = connection.model(orderNum, ImageFileSchema);
    const image = new uploadImage({
      image: bufferImage,
      reason: reason,
    });
    await image.save();
    connection.destroy();
  };
}