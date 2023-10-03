import { Image } from "../Models/Image";

export const updateImageId = (userId: string, imageId: string) => {
  return Image.update(
    { id: userId, imageId: imageId },
    { where: { id: userId } },
  );
};
