import { CronJob } from "cron";
import { findAllCachedOrderIdByOrderId } from "../../Maria/Commands/SelectCachedOrder";
import { Op } from "sequelize";
import { initModels } from "../../Maria/Models/init-models";
import SequelizeConnector from "../../Maria/Connectors/SequelizeConnector";

initModels(SequelizeConnector);

// 달에 한번 평균을 저장하는 코드
export const calculateCostAverageInEveryMonth = new CronJob(
  "0 3 1 * * *",
  () => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    startDate.setDate(1);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth());
    endDate.setDate(1);
    endDate.setHours(0);
    endDate.setMinutes(0);
    endDate.setSeconds(0);

    findAllCachedOrderIdByOrderId({
      date: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    });
  },
  null,
  true,
  "Asia/Seoul"
);
