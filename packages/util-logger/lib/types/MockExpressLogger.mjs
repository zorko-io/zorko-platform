export class MockExpressLogger {
  get expressPino() {
    return (req, res, next) => {
      next()
    }
  }
}
