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

test.serial('Get Preview List', async (t) => {
  const {client} = t.context
  const {data, status} = await client.preview.findAll()

  t.deepEqual(status, 200)
  t.deepEqual(data.total, 2)
  t.deepEqual(data.pagesLeft, 0)
  t.deepEqual(data.items.length, 2)
  t.assert(Array.isArray(data.items), 'Response should contain items list')
})
