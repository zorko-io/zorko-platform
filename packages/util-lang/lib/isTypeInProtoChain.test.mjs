import test from '@zorko-io/tool-test-harness'
import {isTypeInProtoChain} from './isTypeInProtoChain.mjs'

/*
A2
|
A1 -> A3     B
|
A
*/

class A {}

class A1 extends A {}
class A2 extends A {}
class A3 extends A1 {}

class B {}

test('Check type in prototype chain', (t) => {
  t.true(isTypeInProtoChain(A1, A), 'A.prototype in proto chain A1.prototype')
  t.false(isTypeInProtoChain(A, A1), 'A1.prototype is not in proto chain A.prototype')
  t.true(isTypeInProtoChain(A2, A), 'A.prototype in proto chain A2.prototype')
  t.false(isTypeInProtoChain(A2, A3), 'A3.prototype is not in proto chain A2.prototype')
  t.false(isTypeInProtoChain(A3, A2), 'A2.prototype is not in proto chain A3.prototype')
  t.false(isTypeInProtoChain(A, B), 'B.prototype is not in proto chain A.prototype')
  t.false(isTypeInProtoChain(B, A), 'A.prototype is not in proto chain B.prototype')
})
