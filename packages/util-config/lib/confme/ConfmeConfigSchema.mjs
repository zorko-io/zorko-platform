import fs from 'fs'
import {ConfigSchema} from '../core/index.mjs'
import assert from 'assert'

export class ConfmeConfigSchema extends ConfigSchema {

  #context = null;

  /**
   * @param {ConfmeContext|null} context
   */
  constructor(context = {}) {
    assert(context, 'should be defined')

    super()

    this.#context = context
  }

  get structure() {
    return this.#readAsJson(this.#context.definition);
  }

  get validation() {
    return this.#readAsJson(this.#context.validation);
  }

  #readAsJson = (path) => {
    let buffer = fs.readFileSync(path)
    let string = buffer.toString()
    return JSON.parse(string)
  }

}