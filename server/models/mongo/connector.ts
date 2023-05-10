import mongoose from "mongoose";

const connectMongo = async () => {
  if (process.env.MONGO_CHAT === undefined) {
    throw new Error("dotenv의 MONGO_CHAT의 값이 없음");
  } else {
    await mongoose.connect(process.env.MONGO_CHAT , {dbName: 'chat'});
  }
};
export = connectMongo