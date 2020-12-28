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

test('should return true, because A1.prototype has A.prototype in his prototype chain', (t) => {
  t.true(isTypeInProtoChain(A1, A))
})
test('should return true, because A.prototype doesnt have A1.prototype in his prototype chain', (t) => {
  t.false(isTypeInProtoChain(A, A1))
})
test('should return true, because A2.prototype has A.prototype in his prototype chain', (t) => {
  t.true(isTypeInProtoChain(A2, A))
})
test('should return true, because A2.prototype doesnt have A3.prototype in his prototype chain', (t) => {
  t.false(isTypeInProtoChain(A2, A3))
})
test('should return true, because A3.prototype doesnt have A2.prototype in his prototype chain', (t) => {
  t.false(isTypeInProtoChain(A3, A2))
})
test('should return true, because A.prototype doesnt have B.prototype in his prototype chain', (t) => {
  t.false(isTypeInProtoChain(A, B))
})
test('should return true, because B.prototype doesnt have A.prototype in his prototype chain', (t) => {
  t.false(isTypeInProtoChain(B, A))
})
