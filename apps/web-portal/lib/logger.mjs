/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
let LOGGER

export function setLogger(logger) {
  LOGGER = logger
}

export default {
  fatal(data) {
    LOGGER ? LOGGER.fatal(data) : console.debug(data)
  },
  error(data) {
    LOGGER ? LOGGER.error(data) : console.error(data)
  },
  warn(data) {
    LOGGER ? LOGGER.warn(data) : console.warn(data)
  },
  info(data) {
    LOGGER ? LOGGER.info(data) : console.info(data)
  },
  debug(data) {
    LOGGER ? LOGGER.debug(data) : console.debug(data)
  },
  trace(data) {
    LOGGER ? LOGGER.trace(data) : console.debug(data)
  },
}
