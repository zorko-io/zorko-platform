import {UseCase} from '@zorko-io/util-use-case'

export class AuthLogin extends UseCase {
  async run(params) {
    return {
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwianRpIjoiZjI2MDdmZDAtZjBiZi00MDM1LTk5MmUtM2U5YzVjYzkyOWU2IiwiaWF0IjoxNjA3MDE3NzM5LCJleHAiOjE2MDcwMjEzMzl9.Rlt4Hdb4W_437j2UzffeWoil8zmhAmKGOMoGuOx6eq4',
      email: 'example@gmail.com',
      id: '6457eda0-4924-4ff0-94ea-199df9b8aa6c',
      userName: 'Yaroslav Zhbankov',
    }
  }
}
