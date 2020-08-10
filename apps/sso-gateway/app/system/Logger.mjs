import pino         from 'pino';
import testLogger   from '../utils/testLogger.mjs';

const options = {
    prettyPrint : process.env.NODE_ENV !== 'production',
    redact      : {
        paths : [
            'msg.*.data.password',
            'msg.*.data.confirmPassword',
            'msg.*.password',
            'msg.*.confirmPassword',
            'msg.params.token',
            'msg.result.data.jwt',
            'msg.result.jwt'
        ],
        censor : '**SENSITIVE DATA**'
    }
};

class Logger {
    #logger = null;

    constructor() {
        this.#logger = process.env.NODE_ENV === 'test' ? testLogger : pino(options);

        this.#setLoggerMethods();
    }

    #setLoggerMethods = () => {
        const methods = ['fatal', 'error', 'warn', 'info', 'debug'];

        for (let method of methods) {
            this[method] = (...args) => {
                this.#logger[method](...args);
            }
        }
    }
}

export default Logger;