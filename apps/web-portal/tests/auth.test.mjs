import test from '@zorko-io/tool-test-harness'
import {setupAppContext, tearDownAppContext} from './helpers'

test.beforeEach(setupAppContext)
test.afterEach(tearDownAppContext)

test.serial('Auth. Login', async (t) => {
  const {client} = t.context
  const response = await client.auth.login({email: 'example@gmail.com', password: 'password'})

  t.assert(response.token, 'Should return token')
  t.assert(response.email, 'Should return email')
  t.assert(response.userName, 'Should return user name')
  t.assert(response.status === 1, 'Response status should be equal to 1')
})
