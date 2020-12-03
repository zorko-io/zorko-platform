/* eslint-disable no-unused-vars */
import {AuthApi} from '../core'

export class MockAuthApi extends AuthApi {
  #mock = null

  constructor(mock) {
    super()
    this.#mock = mock
  }

  async createToken(params) {
    return this.#mock
  }
}
