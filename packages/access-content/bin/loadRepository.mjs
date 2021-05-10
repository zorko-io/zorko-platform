import {createFacade} from '../lib'
import {createConfigDiscovery} from '@zorko-io/util-config/lib/index.mjs'
import {NotFoundError} from '@zorko-io/util-error/lib/index.mjs'
import {parse} from 'ndjson'

const {argv, stdin, exit} = process

main({
  owner: argv[2],
  repo: argv[3]
}).catch(console.error)

async function main({owner, repo} = {}) {

  const config = createConfigDiscovery({
    dir: '.'
  })
    .discover()

  const facade = await createFacade(config)

  if (!facade) {
    console.error(`Can't create content access instance.`)
    exit(1)
  }

  let trackUploads = []
  let register = facade.register
  let repository = facade.repository

  try {
    await register.get({repo, owner})
  } catch (error) {
    if (error instanceof NotFoundError) {
      await register.allocateNewRepo({owner, repo})
    } else {
      console.error(error)
      exit(1)
    }
  }

  stdin
    .pipe(parse())
    .on('data', function({resource, folder, content}) {
      let upload = repository.add({
        resource,
        content,
        folder: {
          ...folder,
          repo,
          owner
        }
      })

      trackUploads.push(upload)
    })
    .on('end', function() {
      Promise.all(trackUploads)
        .then(() => {
          exit(0)
        })
        .catch((error) => {
          console.error({error})
        })
    })

}