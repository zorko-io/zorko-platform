import {AuthApi} from '../core'

export class MockAuthApi extends AuthApi {

  constructor() {
    super();
    // TODO: gh-52 pass mock config here
  }


  async createToken(params) {
    // TODO: gh-52 provide a
    return  params + 'blalblabl'
  }
}
