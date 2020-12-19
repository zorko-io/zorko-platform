import {CoreLogger} from '@zorko-io/util-logger'
import sinon from 'sinon'

class LoggerWithStub extends CoreLogger {

  constructor(context = {sandbox : sinon}) {
    super();

    const {sandbox} = context

    this.trace = sandbox.stub()

    this.info  = sandbox.stub()

    this.fatal = sandbox.stub()

    this.debug = sandbox.stub()

    this.warn = sandbox.stub()

    this.error = sandbox.stub()

    this.child = sandbox.stub()

  }


  trace(payload) {
    super.trace(payload);
  }

  info(payload) {
    super.info(payload);
  }

  fatal(payload) {
    super.fatal(payload);
  }

  debug(payload) {
    super.debug(payload);
  }

  warn(payload) {
    super.warn(payload);
  }

  error(paylod) {
    super.error(paylod);
  }

  child(payload) {



    return this
  }
}
