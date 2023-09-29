import { WhereOptions } from "sequelize/types/model";
import { CacheMatchedOrder } from "../Models/init-models";

export class CacheOrderModel {
  async create(orderId: number) {
    return CacheMatchedOrder.create({
      id: orderId,
      date: new Date().toISOString(),
    });
  }
  findAll(where?: WhereOptions) {
    return CacheMatchedOrder.findAll({
      attributes: ["id"],
      where: where,
      raw: true,
      nest: true,
    });
  }
}