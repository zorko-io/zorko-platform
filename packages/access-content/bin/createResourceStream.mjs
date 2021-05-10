import {stringify} from 'ndjson'
import {readdir, readFile} from 'fs/promises'
import {basename, join} from 'path'
import {MimeTypes, PermissionDefaults} from '../lib'

export async function createResourceStream( {path}) {

  const stream = stringify()
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
          preview: toDataUri(preview),
          permission: PermissionDefaults.Private
        },
        content: spec,
        folder: {
          path: repoDir + name
        }
      })
    }

    stream.end()

  } catch (err) {
    console.error(err);
  }

  return stream
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