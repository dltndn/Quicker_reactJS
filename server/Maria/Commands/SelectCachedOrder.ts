// import { WhereOptions } from "sequelize/types/model";
import { WhereOptions } from "sequelize";
import { CacheMatchedOrder } from "../Models/CacheMatchedOrder";

export const findAllCachedOrderIdByOrderId = (where? : WhereOptions) => {
  return CacheMatchedOrder.findAll({
    attributes : ['id'],
    where : where,
    raw: true,
    nest: true,
  });
};
