import {CoreExpressLogger} from '../..'

export class MockExpressLogger extends CoreExpressLogger {
  get expressPino() {
    return (req, res, next) => {
      next()
    }
  }
}
