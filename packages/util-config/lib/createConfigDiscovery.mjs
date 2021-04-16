import {ConfmeConfigDiscovery} from './confme'
import {fromUrlToDirPath} from './fromUrlToDirPath'

/**
 * @param {Object} options
 * @param {String} options.dir - location of directory with configurations
 * @return {ConfmeConfigDiscovery}
 */
export function createConfigDiscovery(
  options = {
    dir: fromUrlToDirPath(import.meta.url, '..'),
  }
) {
  const definition = options.dir + '/config.json'
  const validation = options.dir + '/config-schema.json'

  return new ConfmeConfigDiscovery({
    definition,
    validation,
  })
}
