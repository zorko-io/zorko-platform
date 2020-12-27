import test from '@zorko-io/tool-test-harness'
import {isInstanceInProtoChain} from './isInstanceInProtoChain'

test('async - parses valid value', async (t) => {
  // TODO: gh-82 fix existing test, provide few more use cases

  class A {}
  const a = new A()

  class B extends A {}
  const b = new B()

  class C {}
  const c = new C()

  t.true(isInstanceInProtoChain({}, Object))
  t.true(isInstanceInProtoChain([], Object))
  t.true(isInstanceInProtoChain([], Array))
  t.false(isInstanceInProtoChain({}, Array))

  t.true(isInstanceInProtoChain(a, A))
  t.true(isInstanceInProtoChain(b, A))
  t.false(isInstanceInProtoChain(b, C))
})
