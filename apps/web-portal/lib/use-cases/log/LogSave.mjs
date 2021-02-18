import {UseCase} from '@zorko-io/util-use-case'

export class LogSave extends UseCase {
  // eslint-disable-next-line no-unused-vars
  async run(logs) {
    console.log('logs ', logs)
    return {}
  }
}
