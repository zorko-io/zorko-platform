import {ConfmeConfigDiscovery} from './ConfmeConfigDiscovery.mjs'
import {fileURLToPath} from 'url'
import {dirname, resolve} from 'path'

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../')

export function createConfigDiscovery(
  definition = dir + '/config.json',
  validation = dir + '/config-schema.json'
) {

  return new ConfmeConfigDiscovery({
    definition,
    validation
  })

}