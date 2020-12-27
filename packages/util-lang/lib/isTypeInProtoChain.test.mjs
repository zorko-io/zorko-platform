import test from '@zorko-io/tool-test-harness'
import {isTypeInProtoChain} from './isTypeInProtoChain.mjs'

test('async - parses valid value', async (t) => {
  // TODO: gh-82 fix existing test, provide few more use cases

  class Base {}

  class LevelOneBase extends Base {}

  class SubBase extends LevelOneBase {}

  class Alien {}

  //t.true(isTypeInProtoChain(Base, Base))
  t.true(isTypeInProtoChain(LevelOneBase, Base))
  t.true(isTypeInProtoChain(SubBase, LevelOneBase))
  t.true(isTypeInProtoChain(SubBase, Base))

  t.false(isTypeInProtoChain(Base, LevelOneBase))
  t.false(isTypeInProtoChain(Base, SubBase))
  t.false(isTypeInProtoChain(LevelOneBase, SubBase))

  t.false(isTypeInProtoChain(Alien, Base))
})
