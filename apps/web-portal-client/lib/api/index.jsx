import {createClient, ClientTypes} from '@util-web-api-client'

export const client = createClient({
  type: ClientTypes.Axios,
  options: {baseURL: 'http://localhost:7777/'},
})
