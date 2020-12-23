import express from 'express'
import preview from './preview.mjs'


export function route(deps = {}) {

   const router = express.Route()

   const controller = preview(deps)

   router.get('/previews', controller.list)

   return router
}
