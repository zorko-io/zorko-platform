import test from '@zorko-io/tool-test-harness'
import {createValidator} from './createValidator'
import {ValidationError} from '@zorko-io/util-error'

test('runs validate', (t) => {
  let validator = createValidator({
    name: 'required',
  })

   // TODO: gh-39 fix according to new API
  let params = {params: {name: 'boo'}}

  let result = validator.validate(params)
  t.deepEqual(result, params)
})


// test('runs validate', (t) => {
//   let validator = createValidator({
//     name: 'required',
//   })
//
//   let params = {params: {name: 'boo'}}
//
//   let result = validator.validate(params)
//   t.deepEqual(result, params)
// })

test('throws proper error', (t) => {
  let validator = createValidator({
    name: 'required',
  })

  let params = {foo: 'boo'}

  t.throws(
    () => {
      validator.validate(params)
    },
    {instanceOf: ValidationError}
  )
})
