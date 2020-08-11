import lodash from 'lodash';
import logger from '../api/logger.mjs';


async function runUseCase(UseCase, { params }) {
    function logRequest(type, result, startTime) {
        logger[type]({
            useCase: UseCase.name,
            startTime: startTime,
            deltaTime: Date.now() - startTime,
            params,
            result
        });
    }

    const startTime = new Date();

    try {
        const result = await new UseCase().run(params);

        logRequest('info', result, startTime);

        return result;
    } catch (err) {
        logRequest('error', err, startTime);

        throw err;
    }
}

export function makeRouterHandler(UseCaseClass, mapToParams, mapToResponse) {
    return async function routerHandler(req, res) {
        try {
            const params = mapToParams(req);

            const result = await runUseCase(UseCaseClass, { params });

            if (mapToResponse) {
                mapToResponse(result, res);
            } else {
                res.json(result);
            }
        } catch (err) {
            // todo: add errors handling and generation. add errors classes
            if (err.code === 'NOT_FOUND_ERROR') {
                logger.error(err.message);
                res.status(404)
                    .json(err);
            } else if (err.code === 'VALIDATION_ERROR') {
                logger.error(err.message);
                res.status(422)
                    .json(err.message);
            } else {
                const message = lodash.isObject(err) ? err.message : err;
                const stack = err.stack;
                logger.error(message);
                res.status(500)
                    .json({
                        message,
                        stack,
                    });
            }
        }
    }
}
