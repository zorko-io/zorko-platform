import preview from './preview'
import spec from './spec'
import auth from './auth'
import log from './log'

// TODO: Provide helpers/utilities for Rest API
// - jsdocs
// - unit tests
// - document and approach to build routes, extract helpers if needed
// label: dev-prep
export function route(deps) {
  const router = deps.createRouter()
  const previewController = preview(deps)
  const specController = spec(deps)
  const authController = auth(deps)
  const logController = log(deps)

  router.get('/', (req, res) => { res.status(200).send({}) })
  router.get('/previews', previewController.list)
  router.get('/previews/:id', previewController.read)
  router.get('/specs', specController.list)
  router.get('/specs/:id', specController.read)
  router.post('/auth/login', authController.login)
  router.post('/log', logController.save)

  return router
}
