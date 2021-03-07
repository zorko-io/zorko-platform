import {UseCase} from '@zorko-io/util-use-case'
import {apiToken} from '../utils'

export class AuthLogin extends UseCase {
  static rules = {
    email: ['required', 'email'],
    password: 'required',
  }

  async run(params) {
    return {
      token: apiToken.sign(params),
      email: 'example@gmail.com',
      id: '6457eda0-4924-4ff0-94ea-199df9b8aa6c',
      userName: 'Yaroslav Zhbankov',
    }
  }
}
