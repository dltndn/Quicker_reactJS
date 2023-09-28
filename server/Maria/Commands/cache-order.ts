import { WhereOptions } from "sequelize/types/model";
import { CacheMatchedOrder } from "../Models/init-models";

class CacheOrderModel {
  async create(orderId: number) {
    return CacheMatchedOrder.create({
      id: orderId,
      date: new Date().toISOString(),
    });
  }
  find(where?: WhereOptions) {
    return CacheMatchedOrder.findAll({
      attributes: ["id"],
      where: where,
      raw: true,
      nest: true,
    });
  }
}

export default new CacheOrderModel()