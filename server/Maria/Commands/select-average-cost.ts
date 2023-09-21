import { Op } from "sequelize";
import { AverageOfCost } from "../Models/AverageOfCost";

export const findLastAverageCostByDistance = async (distance : string, ) => {
  const recent = await AverageOfCost.max('date') as string
  return AverageOfCost.findOne({
    attributes : [distance],
    where : {
        date : {
            [Op.eq] : recent
        }
    },
    raw: true,
    nest: true,
  });
};
