import {UseCase} from '@zorko-io/util-use-case'
import {apiToken} from '../utils'

export class AuthLogin extends UseCase {
  static rules = {
    credentials: [{
      or: [{
        nested_object: {
          password: ['required'],
          email: ['required', 'email']
        }
      }, {
        nested_object: {
          token: ['required']
        }
      }]
    }, 'required']
  }


  async run(params) {
    // eslint-disable-next-line no-unused-vars
    const {credentials: { token, password, email }} = params

    if (token) {
      apiToken.verify(token)
    }

    return {
      token: apiToken.sign(params),
      email: 'example@gmail.com',
      id: '6457eda0-4924-4ff0-94ea-199df9b8aa6c',
      userName: 'Yaroslav Zhbankov',
    }
  }
}
