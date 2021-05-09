#!/usr/bin/env node

import {readdir, readFile} from 'fs/promises'
import {join, resolve} from 'path'
import {stringify} from 'ndjson'
import {MimeTypes} from '../lib'
const {argv, stdout} = process

main({
  path: argv[2]
}).then(console.log)

async function main({path} = {}){
  const stream = stringify()
  stream.pipe(stdout)
  const repoDir = '/'

  try {

    const files = await readdir(path);
    for (const file of files) {
      let split = file.split('.')
      const name = split[0]
      const extension = split.pop()
      if (extension === 'json') {
        let spec = await readFile(join(path, file), {
          encoding: 'utf-8'
        })
        spec = JSON.parse(spec)
        stream.write({
          resource : {
            name,
            mime: MimeTypes.VegaLite
          },
          content: spec,
          folder: {
            path: repoDir + name
          }
        })
      }else if (extension === 'png') {
        // let preview = await readFile(join(path, file), {encoding: 'base64'})
        // stream.write({
        //   name,
        //   preview: toDataUri(preview)
        // })
      }
    }

  } catch (err) {
    console.error(err);
  } finally {
    stream.end()
  }
}

function toDataUri(content) {
  return `data:image/png;base64,${content}`
}