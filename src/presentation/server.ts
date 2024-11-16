import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FlleSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log-datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// const logRepository = new LogRepositoryImpl(
//     //new FlleSystemDatasource(),
//     //new MongoLogDatasource(),
//     new PostgresLogDatasource()
// )

const fsLogRepository = new LogRepositoryImpl(
    new FlleSystemDatasource(),
)

const mondgoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)

const emailService = new EmailService()

export class Server {
    public static start() {
        console.log("Server started");

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute([
        //     "msifuentesm@simnsa.com"
        // ])

        // emailService.sendEmail({
        //     to: "msifuentesm@simnsa.com",
        //     subject: "Log system",
        //     htmlBody: `
        //         <h3>Log system</h3>
        //         <p>Log system</p>
        //     `
        // })

        // emailService.snedEmailWithFileSystemLogs([
        //     "msifuentesm@simnsa.com"
        // ])

        CronService.CreateJob(
            "*/5 * * * * *",
            () => {
                const url = "https://google.com"
                new CheckServiceMultiple(
                    [fsLogRepository, mondgoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok`), 
                    (error) => console.log(error)
                ).execute(url)
            }
        )
    }
}