import express from 'express'
import preview from './preview.mjs'

// TODO: gh-80 - document and approach to build routes, extract helpers if needed
export function route(deps = {createRoute: () => express.Route()}) {
   const router = deps.createRoute()
   const controller = preview(deps)

   router.get('/previews', controller.list)

   return router
}
