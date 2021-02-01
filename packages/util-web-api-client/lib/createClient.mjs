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
 * @param {Object} configs.options - API client options
 * @param {String} configs.options.baseURL - application base url for an API client
 * @return {MockClientApi}
 */

export function createClient(configs = {type: ClientTypes.Mock}) {
  const {type, options} = configs

  if (ClientTypes.Mock === type) {
    return new MockClientApi()
  }

  return new AxiosClientApi(options)
}
