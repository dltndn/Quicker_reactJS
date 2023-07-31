import connectMongo from "../Connector";
import RealLocationSchema from "../Schemas/realLocation";

export const saveLocation = async (address : any, location : any) => {
    const conn = await connectMongo("realTimeLocation");
    const realLocationSchema = conn.model(address, RealLocationSchema);
    const realLocationModel = new realLocationSchema(location);
    await realLocationModel.save();
    conn.destroy();
}

export const findLocation = async (address : any ) => {
  const conn = await connectMongo("realTimeLocation");
  const realLocationModel = conn.model(address, RealLocationSchema);
  const loaction = await realLocationModel.findOne({}).sort({ $natural: -1 });
  conn.destroy();
  return loaction;
}

