import test from '@zorko-io/tool-test-harness'
import {createValidator} from "./createValidator";
import {ValidationError} from "@zorko-io/util-error";

test('runs validate', t => {
  let validator = createValidator({
    name: 'required'
  })

  let params = {name: 'boo'};

  t.deepEqual(validator.validate(params), params)
})

test('throws proper error', t => {
  let validator = createValidator({
    name: 'required'
  })

  let params = {foo: 'boo'};

  t.throws(()=> {
    validator.validate(params)
  }, {instanceOf:  ValidationError})
})
