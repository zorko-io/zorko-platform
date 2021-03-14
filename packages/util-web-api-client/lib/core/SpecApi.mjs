/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class SpecApi {
  /**
   * @typedef {Object} Specification
   * @property {String} format - specification format
   * @property {Object} spec - specification object
   * @property {String} createAt - ISO 8601 time stamp
   */

  /**
   * Search by id for a specification
   * @param {String} id - specification unique identifier
   * @returns {Promise<Specification>}
   */
  async findById(id) {
    throw new NotYetImplementedError()
  }

  /**
   * Search for specifications
   * @param {CommonParams} params - params to search over specifications
   * @returns {Promise<Collection<Specification>>}
   */
  async findAll(params) {
    throw new NotYetImplementedError()
  }
}
