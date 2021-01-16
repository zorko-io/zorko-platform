import test from '@zorko-io/tool-test-harness'
import sinon from 'sinon'

import {toResult} from './toResult'

test('Basic happy path', (t) => {
  const result = {}
  const req = {}
  const res = {send: sinon.stub()}

  const actual = toResult(result, req, res)

  t.assert(result.status === 1, 'Result should get prop status = 1')
  t.assert(res.send.calledOnceWith(result), 'res.send should been called with arg result')
  t.assert(actual === result, 'toResult should return result object')
})
