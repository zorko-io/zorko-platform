import test from '@zorko-io/tool-test-harness'
import {validate} from "./validate";

test('runs validate', t => {
  t.is(validate(), true)
})
