import { e_LogSeverityLevel, LogModel } from "../models/log.model";

export abstract class LogDatasource {
    abstract saveLog(log: LogModel): Promise<void>;
    abstract getLogs( severityLevel: e_LogSeverityLevel): Promise<LogModel[]>;
}