import test from '@zorko-io/tool-test-harness'
import {ValidationError} from '@zorko-io/util-error'
import {createValidator} from './createValidator'

test('async - parses valid value', async (t) => {
  const validator = createValidator({
    name: 'required',
  })
  const value = {name: 'boo'}
  const {error, result} = await validator.parse(value)

  t.is(error, null)
  t.deepEqual(result, value)
})

test('parses valid value', (t) => {
  const validator = createValidator({
    name: 'required',
  })
  const value = {name: 'boo'}
  const {error, result} = validator.parseSync(value)

  t.is(error, null)
  t.deepEqual(result, value)
})

test('async - parses invalid value', async (t) => {
  const validator = createValidator({
    name: 'required',
  })

  const value = {foo: 'boo'}
  const expectedError = {name: 'REQUIRED'}

  const {error, result} = await validator.parse(value)

  t.assert(error instanceof ValidationError)
  t.deepEqual(error.errors, expectedError)
  t.is(error.message, `ValidationError: ${JSON.stringify(expectedError)}`)
  t.is(result, false)
})

test('parses invalid value', (t) => {
  const validator = createValidator({
    name: 'required',
  })

  const value = {foo: 'boo'}
  const expectedError = {name: 'REQUIRED'}

  const {error, result} = validator.parseSync(value)

  t.assert(error instanceof ValidationError)
  t.deepEqual(error.errors, expectedError)
  t.is(error.message, `ValidationError: ${JSON.stringify(expectedError)}`)
  t.is(result, false)
})
