/* eslint-disable no-unused-vars */
import {Logger} from "../core";

/**
 * Mostly for debugging proposes
 */

export class ConsoleLogger extends Logger {

  #console = null


  constructor(log) {
    super();


    this.#console = log || console
  }

  info(...args) {
    return this.#console.info( ...args);
  }

  fatal(...args) {
    return this.#console.error(...args);
  }

  trace(...args) {
    return this.#console.trace(...args);
  }

  debug(...args) {
    return this.#console.debug(...args);
  }

  warn(...args) {
    return this.#console.warn(...args);
  }

  error(...args) {
    return this.#console.error(...args);
  }

  child(...args) {
    return new ConsoleLogger(this.#console)
  }
}
