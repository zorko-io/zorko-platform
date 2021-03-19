/* eslint-disable no-unused-vars */
import {SpecApi} from '../core'

export class AxiosSpecApi extends SpecApi {
  #http = null
  /**
   * @param http - Axios instance
   */

  constructor(http) {
    super()
    this.#http = http
  }

  async findById(id) {
    const response = await this.#http.get(`/api/v1/specs/${id}`)
    return response ? response.data : {status: 1}
  }

  async findAll(params) {
    const response = await this.#http.get('/api/v1/specs')
    return response ? response.data : {status: 1}
  }
}
