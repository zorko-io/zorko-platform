/**
 * Create web api client
 */
import {MockClientApi} from './mock'
import {AxiosClientApi} from './axios'

export const ClientTypes = {
  AXIOS: 'axios',
  MOCK: 'mock',
}

/**
 * @param {Object} configs - client configs
 * @param {String} configs.type ['axios'] - control implementation 'mock' or 'axios'
 * @return {MockClientApi}
 */

// TODO: replace with real implementation when server is ready
export function createClient(configs = {type: ClientTypes.MOCK}) {
  const {type} = configs

  if (ClientTypes.MOCK === type) {
    return new MockClientApi()
  }

  return new AxiosClientApi()
}
