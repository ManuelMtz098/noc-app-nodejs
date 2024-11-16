export enum e_LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogModelOptions {
    level: e_LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogModel {

    public level: e_LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogModelOptions) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
        this.origin = origin;
    }

    static fromJson(json: string): LogModel {
        json = (json === '') ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse(json);
        const log = new LogModel({
            message, 
            level,
            createdAt,
            origin
        });
        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogModel => {
        const { message, level, createdAt, origin } = object;
        const log = new LogModel({
            message,
            level,
            createdAt,
            origin
        });
        return log;
    }
}