/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class AuthApi {
  /**
   * Make login
   * @param {LoginRequest}
   * @returns {Promise<LoginResponse>}
   */
  async login({login, password}) {
    throw new NotYetImplementedError()
  }
}
