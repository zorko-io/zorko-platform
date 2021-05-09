#!/usr/bin/env node

import {createResourceStream} from './createResourceStream'
const {argv, stdout} = process

main({
  path: argv[2]
}).then(console.log)

async function main({path} = {}){
  let stream =  await createResourceStream({
    path
  })
  stream.pipe(stdout)
}
