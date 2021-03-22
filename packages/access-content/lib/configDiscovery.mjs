import {createConfigDiscovery} from '@zorko-io/util-config/lib/index.mjs'
import {fromUrlToDirPath} from '@zorko-io/util-config/lib/fromUrlToDirPath.mjs'

export const configDiscovery = createConfigDiscovery({
  dir: fromUrlToDirPath(import.meta.url, '..')
})