import {UseCase} from '@zorko-io/util-use-case'

// TODO: add integration tests for api/v1/log endpoint
export class LogSave extends UseCase {
  // eslint-disable-next-line no-unused-vars
  async run(logs) {
    // TODO: wire with log 'pino' instance
    console.log('logs ', logs)
    return {}
  }
}
