import sinon from 'sinon'
import {MockLogger} from '@zorko-io/util-logger'
import {ClientTypes, createClient} from '@zorko-io/util-web-api-client'
import {WebPortalExpressApp} from '../lib'
import {config} from '../config'

export function setupAppContext() {
  const processStub = sinon.stub(process, 'exit')
  const app = new WebPortalExpressApp({config, process, logger: new MockLogger()})
  app.startAndAttach()
  const client = createClient({
    type: ClientTypes.Axios,
    options: {
      baseURL: `http://localhost:${config.http.port}`,
    },
  })

  return {app, client, processStub}
}
