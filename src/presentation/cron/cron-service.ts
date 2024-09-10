import { CronJob } from "cron";

type CrontTime = string | Date;
type onTick = () => void;

export class CronService {
  public static CreateJob(cronTime: CrontTime, onTick: onTick): CronJob {
    const job = new CronJob(cronTime,onTick);
    job.start();

    return job;
  }
}