#!/usr/bin/env node

import {createResourceStream} from './createResourceStream'
const {argv, stdout} = process

main({
  path: argv[2]
}).catch(console.error)

async function main({path} = {}){
  let stream =  await createResourceStream({
    path
  })
  stream.pipe(stdout)
}
