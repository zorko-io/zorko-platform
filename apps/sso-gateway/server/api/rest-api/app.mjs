import express      from 'express';
import middlewares  from './middlewares.mjs';
import logger       from '../logger.mjs';
import v1Route      from './v1/router.mjs';


const app = express();

app.use(middlewares.json);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);

app.use('/api/v1', v1Route);

let server;

export async function start({ serverPort }) {
    server =  app.listen(serverPort, () => {
        logger.info('Server listen on port: ', serverPort);
    })
}

export async function stop() {
    if (!server) return;

    await server.close();
    logger.info('Server closed');
}

export default app;
