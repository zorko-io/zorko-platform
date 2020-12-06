/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class AuthApi {
  /**
   * @typedef {Object} LoginParams
   * @property {String} login - user login
   * @property {String} password - user password
   */
  /**
   * @typedef {Object} LoginResponse
   * @property {String} token - JSON Web Token
   * @property {String} id - user unique identifier
   * @property {String} email - user email
   * @property {String} name - user name
   */
  /**
   * Make login
   * @param {LoginParams} params - params to login
   * @returns {Promise<LoginResponse>}
   */
  async login(params) {
    throw new NotYetImplementedError()
  }
}
