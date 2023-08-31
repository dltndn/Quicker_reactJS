import sequelize from "../Maria/Connectors/SequelizeConnector"
import {initModels} from "../Maria/Models/init-models";
import SelectRoomInfo from "../Maria/Commands/SelectRoomInfo";
import connectMongo from "../Mongo/Connector";
import MessageModel from "../Mongo/Schemas/Message"
import { findRecentMessageByOrderNumber } from "../Mongo/Command/FindMessages";

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