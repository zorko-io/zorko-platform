/* eslint-disable no-unused-vars */
import {CoreLogger} from '../..'

export class MockLogger extends CoreLogger {
  info(...args) {}

  fatal(...args) {}

  trace(...args) {}

  debug(...args) {}

  warn(...args) {}

  error(...args) {}

  child(...args) {
    return this
  }
}
