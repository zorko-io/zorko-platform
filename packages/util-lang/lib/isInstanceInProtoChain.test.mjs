import test from '@zorko-io/tool-test-harness'
import {isInstanceInProtoChain} from './isInstanceInProtoChain'

/*
A2
|
A1 -> A3     B
|
A
*/
class A {}
const a = new A()


class A1 extends A {}
const a1 = new A1()

class A2 extends A {}
const a2 = new A2()

class A3 extends A1 {}
const a3 = new A3()

class B {}
const b = new B()

test('Check instance in prototype chain', (t) => {
  t.true(isInstanceInProtoChain(a, A), 'should return true')
  t.true(isInstanceInProtoChain(a1, A), 'should return true')
  t.false(isInstanceInProtoChain(a, A1), 'should return false,')
  t.true(isInstanceInProtoChain(a2, A), 'should return true,')
  t.false(isInstanceInProtoChain(a2, A3), 'should return false')
  t.false(isInstanceInProtoChain(a3, A2), 'should return false')
  t.false(isInstanceInProtoChain(a, B), 'should return false')
  t.false(isInstanceInProtoChain(b, A), 'should return false')
})
