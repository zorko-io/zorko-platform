/* eslint-disable no-unused-vars */
import {PreviewApi} from '../core'

export class MockPreviewApi extends PreviewApi {
  #mock = null

  constructor(mock) {
    super()
    this.#mock = mock
  }

  async getByUid(uid) {
    return this.#mock[0]
  }

  async getAll(params) {
    return this.#mock
  }
}
