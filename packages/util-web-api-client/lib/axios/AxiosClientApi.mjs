/* eslint-disable no-unused-vars */
import axios from 'axios'
import uuid from 'uuid'
import {ClientApi} from '../core'
import {AxiosAuthApi} from './AxiosAuthApi'
import {AxiosPreviewApi} from './AxiosPreviewApi'

export class AxiosClientApi extends ClientApi {
  #auth = null

  #preview = null

  constructor(options) {
    super()
    const instance = axios.create({
      baseURL: options.baseURL,
      timeout: 1000,
    })
    instance.interceptors.request.use(request => {
      request.headers['X-Trace-Id'] = uuid.v4()
      return request
    })

    this.#auth = new AxiosAuthApi(instance)
    this.#preview = new AxiosPreviewApi(instance)
  }

  get auth() {
    return this.#auth
  }

  get preview() {
    return this.#preview
  }
}
