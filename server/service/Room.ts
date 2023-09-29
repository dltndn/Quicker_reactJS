import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";
import { messageInstance } from "../Mongo/Command";

import connectMongo from "../Mongo/Connector";

initModels(sequelize);

export const findRecentMessage = async (query: any) => {
  const orderNum: number = query.orderNum;
  const conn = await connectMongo("chat");
  const recentMessage = await messageInstance.findRecent(conn, orderNum);
  conn.destroy();
  return recentMessage;
};