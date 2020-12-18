/* eslint-disable no-unused-vars */
import {Logger} from '../..'

export class MockLogger extends Logger {
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
