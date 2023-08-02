import connectMongo from "../Connector";
import ImageFileSchema from "../Schemas/ImageFile";

export const findImageByOrderId = async (orderId:string) => {
    const conn = await connectMongo("orderComplete");
    const imageModel = conn.model(orderId, ImageFileSchema);
    const images = await imageModel.find();
    conn.destroy();
    return images
}

