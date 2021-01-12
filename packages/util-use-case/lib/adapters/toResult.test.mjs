import test from '@zorko-io/tool-test-harness'
import sinon from 'sinon'

import {toResult} from './toResult'

const result = {}
const req = {}
const res = {send: sinon.stub()}
const deps = {}

const toResultReturns = toResult(result, req, res, deps)

test('Test toResult func', (t) => {
  t.assert(result.status === 1, 'Added new prop status 1')
  t.assert(res.send.calledOnceWith(result), 'res.send has been called with result')
  t.assert(toResultReturns === result, 'toResult returns result')
})
