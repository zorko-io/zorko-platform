import fs from 'fs'
import {ConfigSchema} from './ConfigDiscovery.mjs'

export class FsConfigSchema extends ConfigSchema {

  #definition = '';
  #validation = '';

  /**
   *
   * @param {Object} context
   * @param {String} context.definition - path to confme definition file
   * @param {String} context.validation - path to confme validation file
   */
  constructor(context = {}) {
    super()
    this.#definition = context.definition
    this.#validation= context.validation
  }

  get structure() {
    return this.#readAsJson(this.#definition);
  }

  get validation() {
    return this.#readAsJson(this.#validation);
  }

  #readAsJson = (path) => {
    let buffer = fs.readFileSync(path)
    let string = buffer.toString()
    return JSON.parse(string)
  }

}