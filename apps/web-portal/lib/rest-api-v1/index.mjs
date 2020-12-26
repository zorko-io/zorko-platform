import preview from './preview.mjs'

// TODO: gh-80 - jsdocs, unit tests, document and approach to build routes, extract helpers if needed
export function route(deps) {
   const router = deps.createRouter()
   const controller = preview(deps)

   router.get('/previews', controller.list)

   return router
}
