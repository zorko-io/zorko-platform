import test from '@zorko-io/tool-test-harness'
import {createLogger} from './createLogger'

test('creates with defaults', (t) => {
  let logger = createLogger()
  console.log('!!!!!!!!!!!!!', logger)
  console.log('111111111111111', createLogger())
  console.log('2222222222222', logger === createLogger())

  t.is(logger, createLogger())
})

test('call few methods', (t) => {
  let logger = createLogger()

  logger.info('TestLogger')

  t.assert(logger)
})
