import sequelize from "../Maria/Connectors/SequelizeConnector"
import {initModels} from "../Maria/Models/init-models";
import SelectRoomInfo from "../Maria/Commands/SelectRoomInfo";

initModels(sequelize);

export const findRoomInfoByOrderNumber = async (query : any) => {
    const orderNum : number = query.orderNum
    const data = await SelectRoomInfo.getRoomInfo(orderNum)
    return data
}

