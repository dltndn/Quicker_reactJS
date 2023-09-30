import sequelizeConnector from "../maria/connector/sequelize-connector";
import { initModels } from "../maria/models/init-models";
import { messageInstance } from "../mongo/command";
import connectMongo from "../mongo/connector";

initModels(sequelizeConnector);

export const findRecentMessage = async (query: any) => {
  const orderNum: number = query.orderNum;
  const conn = await connectMongo("chat");
  const recentMessage = await messageInstance.findRecent(conn, orderNum);
  conn.destroy();
  return recentMessage;
};