import { EmailService } from "../../../presentation/email/email.service"
import { e_LogSeverityLevel, LogModel } from "../../models/log.model"
import { LogRepository } from "../../repository/log.repository"

interface SendLogEmailUseCase {
    execute: (to:string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly fileSystemLogRepository: LogRepository
    ) {}

    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.snedEmailWithFileSystemLogs(to)

            if (!sent) {
                throw new Error("Email not sent")
            }

            const log = new LogModel({
                level: e_LogSeverityLevel.low,
                message: `Email sent to ${to}`,
                origin: 'send-email-logs.ts'
            })

            await this.fileSystemLogRepository.saveLog(log)

            return true
        } catch (error) {
            const log = new LogModel({
                level: e_LogSeverityLevel.high,
                message: `Email not sent to ${to}`,
                origin: 'send-email-logs.ts'
            })

            await this.fileSystemLogRepository.saveLog(log)

            return false
        }
    }
}