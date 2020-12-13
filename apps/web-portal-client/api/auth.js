import client from './client'

export const login = (params) => {
  return client.auth.login(params)
}
