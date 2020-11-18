import test from '@zorko-io/tool-test-harness'
import {ApplicationError} from "./ApplicationError";

test('creates and check props', t => {
  let error = new ApplicationError('test')

  t.assert(error.name, 'ApplicationError')
  t.assert(error.message, 'test')
})
