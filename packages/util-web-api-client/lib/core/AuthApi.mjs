/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class AuthApi {
  /**
   * Creates token
   * @param {LoginRequest}
   * @returns {Promise<LoginResponse>}
   */
  async createToken({login, password}) {
    throw new NotYetImplementedError()
  }
}
