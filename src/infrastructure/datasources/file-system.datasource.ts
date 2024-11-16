import fs from 'fs'
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogModel, e_LogSeverityLevel } from "../../domain/models/log.model";

export class FlleSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogFiles();
    }

    private createLogFiles = () => {
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath, 
            this.mediumLogsPath, 
            this.highLogsPath
        ].forEach( path => {
            if(!fs.existsSync(path)){
                fs.writeFileSync(path, '')
            }
        })
    }

    async saveLog(newLog: LogModel): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson) //appendFileSync graba una linea al final del archivo

        if(newLog.level === e_LogSeverityLevel.low) return;

        if(newLog.level === e_LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath,logAsJson)
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson)
        }
    }

    private getLowLogsFromFile(path:string): LogModel[] {
        const content = fs.readFileSync(this.allLogsPath, 'utf-8');
        if(content === '') return [];
        const logs = content.split('\n').map(log => LogModel.fromJson(log));
        return logs;
    }

    async getLogs(severityLevel: e_LogSeverityLevel): Promise<LogModel[]> {
        switch (severityLevel) {
            case e_LogSeverityLevel.low:
                return this.getLowLogsFromFile(this.allLogsPath);
            case e_LogSeverityLevel.medium:
                return this.getLowLogsFromFile(this.mediumLogsPath);
            case e_LogSeverityLevel.high:
                return this.getLowLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}