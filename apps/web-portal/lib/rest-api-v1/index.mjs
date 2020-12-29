import preview from './preview.mjs'

// TODO: Provide helpers/utilities for Rest API
// - jsdocs
// - unit tests
// - document and approach to build routes, extract helpers if needed
// label: dev-prep
export function route(deps) {
   const router = deps.createRouter()
   const controller = preview(deps)

   router.get('/previews', controller.list)

   return router
}
