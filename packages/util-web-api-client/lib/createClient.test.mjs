import test from '@zorko-io/tool-test-harness'
import {createClient} from './createClient'

// TODO: gh-52 Add few mock unit tests
test('create client', async (t) => {
  const client = createClient()

  const {auth} = client

  t.truthy(auth)
})
