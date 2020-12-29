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
  t.true(isTypeInProtoChain(A1, A), 'should return true')
  t.false(isTypeInProtoChain(A, A1), 'should return true')
  t.true(isTypeInProtoChain(A2, A), 'should return true')
  t.false(isTypeInProtoChain(A2, A3), 'should return true')
  t.false(isTypeInProtoChain(A3, A2), 'should return true')
  t.false(isTypeInProtoChain(A, B), 'should return true')
  t.false(isTypeInProtoChain(B, A), 'should return true')
})
