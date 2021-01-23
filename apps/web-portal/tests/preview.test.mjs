import test from '@zorko-io/tool-test-harness'
import {setupAppContext} from './_helper'

test.beforeEach((t) => {
  const {app, client, processStub} = setupAppContext()
  t.context = {app, client, processStub}
})

test.afterEach((t) => {
  const {app, processStub} = t.context
  app.stop()
  processStub.restore()
})

test.serial('Get Preview List', async (t) => {
  const {client} = t.context
  const response = await client.preview.findAll()

  t.deepEqual(response.total, 2)
  t.deepEqual(response.pagesLeft, 0)
  t.deepEqual(response.items.length, 2)
  t.assert(response.status === 1, 'Response status should be equal to 1')
  t.assert(Array.isArray(response.items), 'Response should contain items list')
})
