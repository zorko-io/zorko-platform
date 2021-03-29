import {fromUrlToDirPath, createConfigDiscovery} from '@zorko-io/util-config'

export const configDiscovery = createConfigDiscovery({
  dir: fromUrlToDirPath(import.meta.url, '..'),
})
