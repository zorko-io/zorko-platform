import * as RestAPI from './app/api/rest-api/app.mjs';
import * as Model   from  './app/model/index.mjs';
import * as API     from './app/api/index.mjs';
import Logger       from './app/system/Logger.mjs';
import config       from './app/config.cjs';

const logger = new Logger();

API.setLogger(logger);

RestAPI.start({
    serverPort: config.serverPort
});

process.on('SIGTERM', async () => {
    logger.info('[App] SIGTERM signal catched');

    await exit();
});

process.on('SIGINT', async () => {
    logger.info('[App] SIGINT signal catched');

    await exit();
});

process.on('unhandledRejection', error => {
    console.error(error);

    logger.fatal({
        type  : 'UnhandledRejection',
        error : error.stack
    });
});

process.on('uncaughtException', error => {
    console.error(error);

    logger.fatal({
        type  : 'UncaughtException',
        error : error.stack
    });
});

Model.initModels(config.db);

async function exit() {
    await RestAPI.stop();

    logger.info('[App] Exit');
    process.exit(0);
}
