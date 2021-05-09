#!/usr/bin/env node

import {readdir, readFile} from 'fs/promises'
import {join, basename} from 'path'
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
    const files = await readdir(path)
    const specs  = findVegaLiteSpec(files)
    const previews = createPreviewsMap(files)

    for (let spec of specs) {
      let name = basename(spec, '.vl.json')
      let preview = previews[name]
      spec = await readFile(join(path, spec), {
        encoding: 'utf-8'
      })
      spec = JSON.parse(spec)

      preview = await readFile(join(path, previews[name]), {
        encoding: 'base64'
      })

      stream.write({
        resource : {
          name,
          mime: MimeTypes.VegaLite,
          preview: toDataUri(preview)
        },
        content: spec,
        folder: {
          path: repoDir + name
        }
      })
    }

  } catch (err) {
    console.error(err);
  } finally {
    stream.end()
  }
}

function createPreviewsMap(files) {
  return files
    .reduce((memo, file) => {
      if (file.indexOf('vl.png') !== -1) {
        const name = basename(file, '.vl.png')
        memo[name] = file
      }

      return memo
    } , {})
}

function findVegaLiteSpec(files) {
  return files.filter(name => name.indexOf('vl.json') !== -1)
}

function toDataUri(content) {
  return `data:image/png;base64,${content}`
}