import { scheduleJob } from "node-schedule";

export class Cron {
  public start() {
    scheduleJob("* * * * *", async () => {
      // TODO: Run job
    });
  }
}
