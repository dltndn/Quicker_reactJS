import { AverageOfCost, AverageOfCostAttributes } from "../Models/AverageOfCost";

export const insertAverageCost = (data : AverageOfCostAttributes) => AverageOfCost.create(data)
