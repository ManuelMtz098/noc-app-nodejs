import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugins'
import { e_LogSeverityLevel, LogModel } from '../../domain/models/log.model'

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[]
}

interface Attachment {
    filename: string,
    path: string
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(
    ) { }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options
        try {
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })

            return true
        } catch (error) {
            return false
        }
    }

    async snedEmailWithFileSystemLogs(to: string | string[]) {
        const subject = "Log system"
        const htmlBody = `
            <h3>Log system</h3>
            <p>Log system</p>
        `
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' }
        ]

        return this.sendEmail({ to, subject, htmlBody, attachments })
    }
}