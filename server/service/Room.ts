import SelectRoomInfo from "../Maria/Commands/SelectRoomInfo";
import sequelize from "../Maria/Connectors/SequelizeConnector";
import { initModels } from "../Maria/Models/init-models";
import { findRecentMessageByOrderNumber } from "../Mongo/Command/FindMessages";
import connectMongo from "../Mongo/Connector";

initModels(sequelize);

export const findRoomInfoByOrderNumber = async (query : any) => {
    const orderNum : number = query.orderNum
    const data = await SelectRoomInfo.getRoomInfo(orderNum)
    return data
}

export const findRecentMessage = async (query : any) => {
    const orderNum : number = query.orderNum
    const conn = await connectMongo("chat");
    const recentMessage = await findRecentMessageByOrderNumber(conn, orderNum);
    conn.destroy();
    return recentMessage;
}