/* eslint-disable no-unused-vars */
import axios from 'axios'
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
