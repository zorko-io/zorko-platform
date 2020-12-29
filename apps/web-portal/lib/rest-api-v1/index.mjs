import preview from './preview.mjs'

export function route(deps) {
   const router = deps.createRouter()
   const controller = preview(deps)

   router.get('/previews', controller.list)

   return router
}
