/* eslint-disable no-unused-vars */
import {AuthApi} from '../core'

export class MockAuthApi extends AuthApi {
  #mock = null

  constructor(mock) {
    super()
    this.#mock = mock
  }

  async login(params) {
    return this.#mock
  }
}
