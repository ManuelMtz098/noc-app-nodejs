import { e_LogSeverityLevel, LogModel } from '../../models/log.model';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUserCase {
    execute(url:string):Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUserCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback, 
        private readonly errorCallback: ErrorCallback
    ){

    }

    public async execute(url:string):Promise<boolean> {
        try {
        const req = await fetch(url);
           if(!req.ok){
            throw new Error('Error fetching');
           }

           const log = new LogModel({
                message: `Service ${url} working`, 
                level: e_LogSeverityLevel.low,
                origin: 'check-service.ts'    
            });
           this.logRepository.saveLog(log);
           this.successCallback && this.successCallback();
           return true;

        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogModel({
                message: errorMessage, 
                level: e_LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
}