import {ClientApi} from '../core'
import {MockAuthApi} from './MockAuthApi'
import {MockPreviewApi} from './MockPreviewApi'
import {MockLogApi} from './MockLogApi'
import mock from './mock.json'

export class MockClientApi extends ClientApi {
  #auth = null

  #preview = null

  #log = null

  constructor() {
    super()
    this.#auth = new MockAuthApi(mock.auth)
    this.#preview = new MockPreviewApi(mock.preview)
    this.#log = new MockLogApi()
  }

  get auth() {
    return this.#auth
  }

  get preview() {
    return this.#preview
  }

  get log() {
    return this.#log
  }
}
