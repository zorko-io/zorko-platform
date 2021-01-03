/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
let _LOGGER

export function setLogger(logger) {
  _LOGGER = logger
}

export default {
  fatal(data) {
    _LOGGER ? _LOGGER.fatal(data) : console.debug(data)
  },
  error(data) {
    _LOGGER ? _LOGGER.error(data) : console.error(data)
  },
  warn(data) {
    _LOGGER ? _LOGGER.warn(data) : console.warn(data)
  },
  info(data) {
    _LOGGER ? _LOGGER.info(data) : console.info(data)
  },
  debug(data) {
    _LOGGER ? _LOGGER.debug(data) : console.debug(data)
  },
  trace(data) {
    _LOGGER ? _LOGGER.trace(data) : console.debug(data)
  },
}
