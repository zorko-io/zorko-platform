import sinon from 'sinon'
import {MockLogger} from '@zorko-io/util-logger'
import {ClientTypes, createClient} from '@zorko-io/util-web-api-client'
import {WebPortalExpressApp} from '../lib'
import {config} from '../config'

export function setupAppContext(t) {
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
}

export function tearDownAppContext(t) {
  const {app, processStub} = t.context
  app.stop()
  processStub.restore()
}
