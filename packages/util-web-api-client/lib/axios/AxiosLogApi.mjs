/* eslint-disable no-unused-vars */
import {LogApi} from '../core'

export class AxiosLogApi extends LogApi {
  #http = null
  /**
   * @param http - Axios instance
   */

  constructor(http) {
    super()
    this.#http = http
  }

  async send(logs) {
    const response = await this.#http.post(`/api/v1/log`, logs)
    return response ? response.data : {status: 1}
  }
}
