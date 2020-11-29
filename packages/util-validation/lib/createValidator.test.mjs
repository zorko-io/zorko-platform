import test from '@zorko-io/tool-test-harness'
import {createValidator} from './createValidator'
import {ValidationError} from '@zorko-io/util-error'

test('async - parses valid value', async t => {
  let validator = createValidator({
    name: 'required',
  })
  let value = {name: 'boo'}
  let {error, result} = await validator.parse(value)

  t.is(error, null)
  t.deepEqual(result, value)
})

test('parses valid value', t => {
  let validator = createValidator({
    name: 'required',
  })
  let value = {name: 'boo'}
  let {error, result} = validator.parseSync(value)

  t.is(error, null)
  t.deepEqual(result, value)
})

test('async - parses invalid value', async t => {
  let validator = createValidator({
    name: 'required',
  })

  let value = {foo: 'boo'}
  let expectedError = { name: 'REQUIRED'}

  const {error, result} = await validator.parse(value)

  t.assert(error instanceof ValidationError)
  t.deepEqual(error.errors, expectedError)
  t.is(error.message, `ValidationError: ${JSON.stringify(expectedError)}`)
  t.is(result, false)
})

test('parses invalid value', t => {
  let validator = createValidator({
    name: 'required',
  })

  let value = {foo: 'boo'}
  let expectedError = { name: 'REQUIRED'}

  const {error, result} = validator.parseSync(value)

  t.assert(error instanceof ValidationError)
  t.deepEqual(error.errors, expectedError)
  t.is(error.message, `ValidationError: ${JSON.stringify(expectedError)}`)
  t.is(result, false)
})
