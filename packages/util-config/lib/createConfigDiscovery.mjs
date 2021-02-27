import {ConfmeConfigDiscovery} from './confme'
import {fromUrlToDirPath} from './fromUrlToDirPath'

const dir = fromUrlToDirPath(import.meta.url, '..')

export function createConfigDiscovery(
  definition = dir + '/config.json',
  validation = dir + '/config-schema.json'
) {
  return new ConfmeConfigDiscovery({
    definition,
    validation
  })

}