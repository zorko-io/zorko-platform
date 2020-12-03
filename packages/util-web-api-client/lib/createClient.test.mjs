import test from '@zorko-io/tool-test-harness'
import mock from './mock/mock.json'
import {createClient} from './createClient'

test('create client', async (t) => {
  const client = createClient()

  const {auth, preview} = client
  t.truthy(auth)
  t.truthy(preview)
})

test('create token', async (t) => {
  const client = createClient()

  const {auth} = client
  t.is(mock.auth, await auth.login())
})

test('get all preview', async (t) => {
  const client = createClient()

  const {preview} = client
  t.is(mock.preview, await preview.getAll())
})

test('get preview by uid', async (t) => {
  const client = createClient()
  const fakeUid = 'e83f5de5-7b34-453e-bda2-0f4d50f82318'
  const {preview} = client
  t.is(mock.preview[0], await preview.getByUid(fakeUid))
})
