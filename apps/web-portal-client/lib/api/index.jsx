import {createClient, ClientTypes} from '@util-web-api-client'

// TODO: Move base url value to app config/envs
export const client = createClient({
  type: ClientTypes.Axios,
  options: {baseURL: 'http://localhost:7777/'},
})
