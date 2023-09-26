import { Connection } from "mongoose";
import RealLocationSchema from "../Schemas/realLocation";

export const saveLocation = async (connection: Connection,address : any, location : any) => {
    const realLocationSchema = connection.model(address, RealLocationSchema);
    const realLocationModel = new realLocationSchema(location);
    await realLocationModel.save();
    connection.destroy();
}

export const findLocation = async (connection: Connection, address : any ) => {
  const realLocationModel = connection.model(address, RealLocationSchema);
  const loaction = await realLocationModel.findOne({}).sort({ $natural: -1 });
  connection.destroy();
  return loaction;
}

