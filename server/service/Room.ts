import sequelize from "../Maria/Connectors/SequelizeConnector"
import {initModels} from "../Maria/Models/init-models";
import SelectRoomInfo from "../Maria/Commands/SelectRoomInfo";
import connectMongo from "../Mongo/Connector";
import MessageModel from "../Mongo/Schemas/Message"

initModels(sequelize);

export const findRoomInfoByOrderNumber = async (query : any) => {
    const orderNum : number = query.orderNum
    const data = await SelectRoomInfo.getRoomInfo(orderNum)
    return data
}

export const findRecentMessage = async (query : any) => {
    const orderNum : number = query.orderNum
    const conn = await connectMongo("chat");
    const message = conn.model(String(orderNum), MessageModel);
    const recentMessage = await message.findOne().select(["-_id", "-__v"]).sort({ $natural: -1 });
    conn.close();
    return recentMessage;
}