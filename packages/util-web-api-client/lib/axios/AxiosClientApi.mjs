/* eslint-disable no-unused-vars */
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import {ClientApi} from '../core'
import {AxiosAuthApi} from './AxiosAuthApi'
import {AxiosPreviewApi} from './AxiosPreviewApi'
import {AxiosSpecApi} from './AxiosSpecApi'
import {AxiosLogApi} from './AxiosLogApi'

export class AxiosClientApi extends ClientApi {
  #auth = null

  #preview = null

  #spec = null

  #log = null

  constructor(options) {
    super()
    const instance = axios.create({
      baseURL: options.baseURL,
      timeout: 1000,
    })
    instance.interceptors.request.use(request => {
      request.headers['X-Trace-Id'] = uuid()
      return request
    })

    this.#auth = new AxiosAuthApi(instance)
    this.#preview = new AxiosPreviewApi(instance)
    this.#spec = new AxiosSpecApi(instance)
    this.#log = new AxiosLogApi(instance)
  }

  get auth() {
    return this.#auth
  }

  get preview() {
    return this.#preview
  }

  get spec() {
    return this.#spec
  }

  get log() {
    return this.#log
  }
}
