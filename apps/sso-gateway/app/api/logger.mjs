import testLogger       from '../utils/testLogger.mjs';
import consoleLogger    from '../utils/consoleLogger.mjs';

let _LOGGER = process.env.NODE_ENV === 'test' ? testLogger : consoleLogger;

export function setLogger(logger) {
    _LOGGER = logger;
}

export default {
    fatal:  (...args)   =>  { _LOGGER.fatal(args) },
    error:  (...args)   =>  { _LOGGER.error(args); },
    warn:   (...args)   =>  { _LOGGER.warn(args); },
    info:   (...args)   =>  { _LOGGER.info(args); },
    debug:  (...args)   =>  { _LOGGER.debug(args); },
}
