import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogModel, e_LogSeverityLevel } from "../../domain/models/log.model";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDatasource,
    ){}

    async saveLog(log: LogModel): Promise<void> {
        return this.logDatasource.saveLog(log);
    }

    async getLogs(severityLevel: e_LogSeverityLevel): Promise<LogModel[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}