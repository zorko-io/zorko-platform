/* eslint-disable no-unused-vars */
import {PreviewApi} from '../core'

export class AxiosPreviewApi extends PreviewApi {
  /**
   * @param http - Axios instance
   */

  constructor(http) {
    super()
  }

  async findById(id) {
    super.findById(id)
  }

  async findAll(params) {
    super.findAll(params)
  }
}
