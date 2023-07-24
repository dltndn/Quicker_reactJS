import sequelize from "../Maria/Connectors/SequelizeConnector"
import {initModels} from "../Maria/Models/init-models";
import SelectRoomInfo from "../Maria/Commands/SelectRoomInfo";

initModels(sequelize);

export const findRoomInfoByOrderNumber = async (orderNum : number) => {
    const data = await SelectRoomInfo.getRoomInfo(orderNum)
    return data
}

