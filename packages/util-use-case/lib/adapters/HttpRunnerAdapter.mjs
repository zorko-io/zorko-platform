import {RunnerAdapter} from './RunnerAdapter.mjs'

export class HttpRunnerAdapter extends RunnerAdapter {

  #req = null
  #res = null

  constructor(...args) {
    super();

    this.#req = args[0]
    this.#res = args[1]

  }




}
