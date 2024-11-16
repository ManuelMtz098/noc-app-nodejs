import { PrismaClient, SeverutyLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogModel, e_LogSeverityLevel } from "../../domain/models/log.model";

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverutyLevel.LOW,
    medium: SeverutyLevel.MEDIUM,
    high: SeverutyLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogModel): Promise<void> {
        const level:SeverutyLevel = severityEnum[log.level];

        const nreLog = await prisma.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });

        console.log("postgres saved")
    }

    async getLogs(severityLevel: e_LogSeverityLevel): Promise<LogModel[]> {
        const level:SeverutyLevel = severityEnum[severityLevel];

        const logs = await prisma.logModel.findMany({
            where: {
                level
            }
        });
        return logs.map(dbLog => LogModel.fromObject(dbLog));
    }
}