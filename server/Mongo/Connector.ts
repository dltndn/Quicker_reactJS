import mongoose from "mongoose";
import keys from "../config/keys";

const connectMongo = async (databaseName : string) => {
  if (keys.db.mongo === undefined) {
    throw new Error("dotenv의 MONGO_CHAT의 값이 없음");
  } else {
    return mongoose.createConnection(keys.db.mongo , {dbName: databaseName});
  }
};

export default connectMongo