import * as RestAPI from './server/api/rest-api/app.mjs';
import * as Model   from  './server/model/index.mjs';
import * as API     from './server/api/index.mjs';
import Logger       from './server/system/Logger.mjs';
import config       from './server/config.cjs';

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
