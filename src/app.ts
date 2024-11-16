import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/env.plugins';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server'

(async () => {
    main()
})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // const prisma = new PrismaClient();
    // const nreLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Hola Mundo',
    //         origin: 'App.ts'
    //     }
    // });

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM'
    //     }
    // });

    Server.start();
}