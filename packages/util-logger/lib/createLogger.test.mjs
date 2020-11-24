import test from '@zorko-io/tool-test-harness'
import {createLogger} from './createLogger'

test('creates with defaults', (t) => {
  let logger = createLogger()

  t.is(logger, createLogger())
})

test('call few methods', (t) => {
  let logger = createLogger()

  logger.info('TestLogger')

  t.assert(logger)
})
