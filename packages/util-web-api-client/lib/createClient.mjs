/**
 * Create web api client
 */
import {MockClientApi} from './mock'
import {AxiosClientApi} from './axios'

export const ClientTypes = {
  Axios: 'axios',
  Mock: 'mock',
}

/**
 * @param {Object} configs - client configs
 * @param {String} configs.type ['axios'] - control implementation 'mock' or 'axios'
 * @return {MockClientApi}
 */

export function createClient(configs = {type: ClientTypes.Mock}) {
  const {type} = configs

  if (ClientTypes.Mock === type) {
    return new MockClientApi()
  }

  return new AxiosClientApi()
}
