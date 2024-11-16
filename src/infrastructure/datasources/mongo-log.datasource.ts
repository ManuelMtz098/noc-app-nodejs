import { LogModel as LogModelMongo } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { e_LogSeverityLevel, LogModel } from "../../domain/models/log.model";

export class MongoLogDatasource implements LogDatasource {
    async saveLog(log: LogModel): Promise<void> {
        const newLog = await LogModelMongo.create(log);
        console.log('Mongo Log created: ', newLog.id);
    }
    async getLogs(severityLevel: e_LogSeverityLevel): Promise<LogModel[]> {
        const logs = await LogModelMongo.find({
            level: severityLevel
        })

        return logs.map(mongoLog => LogModel.fromObject(mongoLog));
    }
}