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

test('should return true because a has A.prototype in his prototype chain', (t) => {
  t.true(isInstanceInProtoChain(a, A))
})

test('should return true because a1 has A.prototype in his prototype chain', (t) => {
  t.true(isInstanceInProtoChain(a1, A))
})

test('should return false, because a doesnt have A1.proptotype in his prototype chain', (t) => {
  t.false(isInstanceInProtoChain(a, A1))
})

test('should return true, because a2 has A.proptotype in his prototype chain', (t) => {
  t.true(isInstanceInProtoChain(a2, A))
})

test('should return false, because a2 doesnt have A3.proptotype in his prototype chain', (t) => {
  t.false(isInstanceInProtoChain(a2, A3))
})

test('should return false, because a3 doesnt have A2.proptotype in his prototype chain', (t) => {
  t.false(isInstanceInProtoChain(a3, A2))
})

test('should return false, because a doesnt have B.proptotype in his prototype chain', (t) => {
  t.false(isInstanceInProtoChain(a, B))
})

test('should return false, because b doesnt have A.proptotype in his prototype chain', (t) => {
  t.false(isInstanceInProtoChain(b, A))
})
