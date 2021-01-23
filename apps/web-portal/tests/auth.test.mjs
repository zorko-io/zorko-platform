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

test.serial('Auth. Login', async (t) => {
  const {client} = t.context
  const response = await client.auth.login({email: 'example@gmail.com', password: 'password'})

  t.assert(response.token, 'Should return token')
  t.assert(response.email, 'Should return email')
  t.assert(response.userName, 'Should return user name')
  t.assert(response.status === 1, 'Response status should be equal to 1')
})
