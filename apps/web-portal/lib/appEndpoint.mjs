import {makeRunner} from '@zorko-io/util-use-case'
import express from 'express'

// TODO: gh-80 refactor and move to use-cases utils or util-endpoint

export function appEndpoint(app, path, defineEndpoints) {
    const router = express.Router()

    const endpoints = defineEndpoints({
      makeRunner
    })

    if (endpoints.list){
      router.get('/list', endpoints.list)
    }

    app.use(path, router)
}
