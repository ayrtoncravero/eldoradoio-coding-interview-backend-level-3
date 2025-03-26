import 'reflect-metadata';
import http from 'http'
import app from './app';
import database from './config/database';
import logger from './utils/logger';
import { config } from './config/config';

const PORT = config.PORT || 3000;

async function main(): Promise<void> {
    await database.initialize();
    logger.info('Database connect');

    const server = http.createServer(app)

    app.listen(PORT, () => {
        logger.info(`⚡️ Server running on port: ${PORT}`)
    })

    const onProcessKill = async () => {
        console.log('closing server')
        await database.destroy()

        setTimeout(() => {
            server.close(() => process.exit(0))
        }, 1000)
    }

    process.on('SIGINT', onProcessKill);
    process.on('SIGTERM', onProcessKill)
    process.on('SIGABRT', onProcessKill)
    process.on('*', (...args) => console.log(...args))

    console.log('process listeners ready up')
}

export {
    main
};
