/* eslint-disable no-unused-vars */
import {PreviewApi} from '../core'

export class MockPreviewApi extends PreviewApi {
  #mock = null

  constructor(mock) {
    super()
    this.#mock = mock
  }

  async findById(id) {
    return this.#mock[0]
  }

  async findAll(params) {
    return this.#mock
  }
}
