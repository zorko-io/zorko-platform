import client from './client'

export const login = async (params) => {
  return client.auth.login(params)
}
