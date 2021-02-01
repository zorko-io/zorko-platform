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
    const response = await this.#http.get(`/api/v1/previews/${id}`)
    return response ? response.data : {status: 1}
  }

  async findAll(params) {
    const response = await this.#http.get('/api/v1/previews')
    return response ? response.data : {status: 1}
  }
}
