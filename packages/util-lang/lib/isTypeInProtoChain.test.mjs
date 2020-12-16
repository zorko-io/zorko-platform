import test from '@zorko-io/tool-test-harness'
import {isTypeInProtoChain} from './isTypeInProtoChain.mjs'

test('async - parses valid value', async (t) => {
  // TODO: gh-82 fix existing test, provide few more use cases

  class Base {}

  class LevelOneBase extends Base {}

  class SubBase extends LevelOneBase {}

  class Alien {}

  t.assert(isTypeInProtoChain(SubBase, Base), true)
  t.assert(isTypeInProtoChain(Alien, Base), false)
})




