import {ConfmeConfigDiscovery} from './confme'
import {fromUrlToDirPath} from './fromUrlToDirPath'

const dir_ = fromUrlToDirPath(import.meta.url, '..')

/**
 *
 * @param {Object} options
 * @param {String} options.dir - location of directory with configurations
 * @return {ConfmeConfigDiscovery}
 */
export function createConfigDiscovery(options = {dir : dir_}
) {
  const definition = options.dir + '/config.json'
  const validation = options.dir + '/config-schema.json'

  return new ConfmeConfigDiscovery({
    definition,
    validation
  })

}