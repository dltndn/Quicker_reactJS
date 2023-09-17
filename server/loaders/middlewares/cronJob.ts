import {CronJob} from "cron"

// 달에 한번 평균을 저장하는 코드
export const calculateCostAverageInEveryMonth = new CronJob(
    '0 3 1 * * *',
    () => {
        console.log('You will see this message every second');
    },
    null,
    true,
    'Asia/Seoul'
);
