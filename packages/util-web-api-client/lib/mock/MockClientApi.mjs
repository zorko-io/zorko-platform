import {ClientApi} from '../core'
import {MockAuthApi} from './MockAuthApi'

export class MockClientApi extends ClientApi {

  #auth = null

  constructor() {
    super();
    // TODO: gh-52 pass mock config here
    this.#auth = new MockAuthApi();
  }

  get auth() {
    return this.#auth;
  }
}
