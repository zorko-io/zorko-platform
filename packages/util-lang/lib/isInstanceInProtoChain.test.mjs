import test from '@zorko-io/tool-test-harness'
import {isInstanceInProtoChain} from './isInstanceInProtoChain'

test.skip('async - parses valid value', async (t) => {
  // TODO: gh-82 fix existing test, provide few more use cases

  t.assert(isInstanceInProtoChain({}, Object), true)
})
