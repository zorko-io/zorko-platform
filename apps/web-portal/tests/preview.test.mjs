import test from '@zorko-io/tool-test-harness'
import {createClient, ClientTypes} from '@zorko-io/util-web-api-client'
import {MockLogger} from '@zorko-io/util-logger'
import {WebPortalExpressApp} from '../lib'
import {config} from '../config'

test.beforeEach((t) => {
  const app = new WebPortalExpressApp({config, process, logger: new MockLogger()})
  app.startAndAttach()
  const client = createClient({type: ClientTypes.Axios})
  t.context = {app, client}
})
test.afterEach((t) => {
  const {app} = t.context
  app.stop()
})

test('create UseCase with default context', async (t) => {
  const {client} = t.context

  const { data, status } = await client.preview.findAll()

  console.log('previews ', data)
  console.log('status ', status)

  t.assert(1, 'Result should get prop status = 1')
})
