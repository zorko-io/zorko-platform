import test from '@zorko-io/tool-test-harness'
import {enhanceWithValidation} from './enhanceWithValidation'
import {NotYetImplementedError, ResourceAccessError, ValidationError} from '@zorko-io/util-error'
import {AssertionError} from 'assert'

class CoreTestAccess {
  doSomething() {
    throw new NotYetImplementedError()
  }
}

class TestAccess extends CoreTestAccess {
  doSomething(params = {}) {
    const {msg}  = params
    return {msg: msg + "!"}
  }
}

test('must have an #origin in context', t => {
  const TestAccessWithValidation = enhanceWithValidation({
    clazz: CoreTestAccess,
    wrap: () => ({
      doSomething: {
        msg: ['required', 'string']
      }
    })
  })

  t.throws(()=> {
    new TestAccessWithValidation()
  }, {
    instanceOf:AssertionError,
    message:'should have #origin in context'
  })
})

test('does simple check', (t) => {
  const TestAccessWithValidation = enhanceWithValidation({
    clazz: CoreTestAccess,
    wrap: () => ({
      doSomething: {
        msg: ['required', 'string']
      }
    })
  })

  let instance = new TestAccessWithValidation({
    origin: new TestAccess()
  })
  t.truthy(instance)

  t.throws(() => {
    instance.doSomething('fdfdfdfdf')
  }, {
    instanceOf: ResourceAccessError,
    message: 'ValidationError: "FORMAT_ERROR"'
  })

  let result = instance.doSomething({msg:'hello'})

  t.deepEqual(result, {msg: 'hello!'})
})

test('fails if no such method', t => {
  t.throws(() => {
    enhanceWithValidation({
      clazz: TestAccess,
      wrap: () => ({
        barFoo: {
          msg: ['required', 'string']
        }
      })
    })
  }, {
    instanceOf: ValidationError,
    message: 'ValidationError: {"NOT_MATCHED_METHOD_NAME":{"inClazz":"TestAccess","method":"barFoo"}}'
  })
})
