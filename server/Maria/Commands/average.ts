import { Op } from "sequelize";
import { AverageOfCost, AverageOfCostAttributes } from "../Models/init-models";

class AverageModel {
  async findLastAverageCostByDistance(distance: string) {
    const recent = (await AverageOfCost.max("date")) as string;
    return AverageOfCost.findOne({
      attributes: [distance],
      where: {
        date: {
          [Op.eq]: recent,
        },
      },
      raw: true,
      nest: true,
    });
  }
  insertAverageCost(data: AverageOfCostAttributes) {
    AverageOfCost.create(data);
  }
}

export default new AverageModel()