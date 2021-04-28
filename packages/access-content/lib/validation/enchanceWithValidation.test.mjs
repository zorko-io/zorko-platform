import test from '@zorko-io/tool-test-harness'
import sinon from 'sinon'
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
    rules: {
      doSomething: {
        msg: ['required', 'string']
      }
    }
  })

  t.throws(()=> {
    new TestAccessWithValidation()
  }, {
    instanceOf:AssertionError,
    message:'should have #origin in context'
  })
})

test('delegation to origin method', (t) => {
  const TestAccessWithValidation = enhanceWithValidation({
    clazz: CoreTestAccess,
    rules: {
      doSomething: {
        msg: ['required', 'string']
      }
    }
  })

  const origin = {
    doSomething: sinon.stub().returns('from origin')
  }

  const access = new TestAccessWithValidation({origin})

  const result = access.doSomething({msg: 'test'})

  t.deepEqual(result, 'from origin')
  t.true(origin.doSomething.calledOnce,'should call #origin')
  t.deepEqual(origin.doSomething.firstCall.args, [{msg: 'test'}])
})

test('does simple check', (t) => {
  const TestAccessWithValidation = enhanceWithValidation({
    clazz: CoreTestAccess,
    rules:{
      doSomething: {
        msg: ['required', 'string']
      }
    }
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
      rules: {
        barFoo: {
          msg: ['required', 'string']
        }
      }
    })
  }, {
    instanceOf: ValidationError,
    message: 'ValidationError: {"NOT_MATCHED_METHOD_NAME":{"inClazz":"TestAccess","method":"barFoo"}}'
  })
})
