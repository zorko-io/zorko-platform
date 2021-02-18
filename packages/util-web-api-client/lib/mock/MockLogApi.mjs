/* eslint-disable no-unused-vars */
import {LogApi} from '../core'

export class MockLogApi extends LogApi {
  #mock = null

  constructor(mock) {
    super()
    this.#mock = mock
  }

  async send(logs) {
    return undefined
  }
}
