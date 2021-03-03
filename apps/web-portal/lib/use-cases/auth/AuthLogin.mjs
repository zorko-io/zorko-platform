import {UseCase} from '@zorko-io/util-use-case'
import {apiToken} from '../utils'

export class AuthLogin extends UseCase {
  // eslint-disable-next-line no-unused-vars
  async run(params) {
    if (params.token) {
      apiToken.verify(params.token)
    }

    return {
      token: apiToken.sign(params),
      email: 'example@gmail.com',
      id: '6457eda0-4924-4ff0-94ea-199df9b8aa6c',
      userName: 'Yaroslav Zhbankov',
    }
  }
}
