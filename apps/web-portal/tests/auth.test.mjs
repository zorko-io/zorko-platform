import sinon from 'sinon'
import test from '@zorko-io/tool-test-harness'
import {createClient, ClientTypes} from '@zorko-io/util-web-api-client'
import {MockLogger} from '@zorko-io/util-logger'
import {WebPortalExpressApp} from '../lib'
import {config} from '../config'

test.beforeEach((t) => {
  const processStub = sinon.stub(process, 'exit')
  const app = new WebPortalExpressApp({config, process, logger: new MockLogger()})
  app.startAndAttach()
  const client = createClient({
    type: ClientTypes.Axios,
    options: {
      baseURL: `http://localhost:${config.http.port}`,
    },
  })
  t.context = {app, client, processStub}
})

test.afterEach((t) => {
  const {app, processStub} = t.context
  app.stop()
  processStub.restore()
})

test.serial('Auth. Login', async (t) => {
  const {client} = t.context
  const {data, status} = await client.auth.login({email: 'example@gmail.com', password: 'password'})

  t.deepEqual(status, 200)
  t.assert(data.token, 'Should return token')
  t.assert(data.email, 'Should return email')
  t.assert(data.userName, 'Should return user name')
  t.assert(data.status === 1, 'Response status should be equal to 1')
})
