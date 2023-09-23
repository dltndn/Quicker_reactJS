import { CronJob } from "cron";
import { main } from "./cron-job-fn";

// 평균저장코드
export const insertAverageCostPerMonth = new CronJob(
  "0 3 1 * * *",
  main,
  null,
  true,
  "Asia/Seoul"
);
