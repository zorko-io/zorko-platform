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

    let buffer = fs.readFileSync(this.#definition)
    let string = buffer.toString()
    let json = JSON.parse(string)
    console.log({json})
    return json;
  }

  get validation() {
    return fs.readFileSync(this.#validation).toJSON();
  }
}