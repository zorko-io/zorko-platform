import {configDiscovery} from './configDiscovery'

export function createSpaces (config) {
  if (!config) {
    config = configDiscovery.discover()
  }

  return {}
}