import test from '@zorko-io/tool-test-harness'
import {enhanceWithValidation} from './enhanceWithValidation'
import {ResourceAccessError} from '@zorko-io/util-error/lib/index.mjs'

class TestAccess {
  constructor(props) {
    console.log({PROPS: props})
  }

  doSomething(params = {}) {
    const {msg}  = params
    return {msg: msg + "!"}
  }
}

test('test simple check', async (t) => {
  const TestAccessWithValidation = enhanceWithValidation({
    clazz: TestAccess,
    wrap: () => ({
      doSomething: {
        msg: ['required', 'string']
      }
    })
  })

  let instance = new TestAccessWithValidation()
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
