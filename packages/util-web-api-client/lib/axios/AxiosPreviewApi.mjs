/* eslint-disable no-unused-vars */
import {PreviewApi} from '../core'

export class AxiosPreviewApi extends PreviewApi {
  #http = null
  /**
   * @param http - Axios instance
   */

  constructor(http) {
    super()
    this.#http = http
  }

  async findById(id) {
    return this.#http.get('/api/v1/previews')
  }

  async findAll(params) {
    return this.#http.get('/api/v1/previews')
  }
}
