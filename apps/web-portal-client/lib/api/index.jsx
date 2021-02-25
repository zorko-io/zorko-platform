import {ClientTypes, createClient} from '@util-web-api-client'

export const client = createClient({
  type: ClientTypes.Axios,
  options: {baseURL: process.env.ZORKO_API_BASE_URL},
})
