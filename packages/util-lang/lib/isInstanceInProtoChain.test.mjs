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
  t.true(isInstanceInProtoChain(a, A), 'A.prototype in proto chain a')
  t.true(isInstanceInProtoChain(a1, A), 'A.prototype in proto chain a1')
  t.false(isInstanceInProtoChain(a, A1), 'A1.prototype is not in proto chain a')
  t.true(isInstanceInProtoChain(a2, A), 'A.prototype in proto chain a2')
  t.false(isInstanceInProtoChain(a2, A3), 'A3.prototype is not in proto chain a2')
  t.false(isInstanceInProtoChain(a3, A2), 'A2.prototype in not in proto chain a3')
  t.false(isInstanceInProtoChain(a, B), 'B.prototype is not in proto chain a')
  t.false(isInstanceInProtoChain(b, A), 'A.prototype is not in proto chain b')
})
