import client from './client'

export const login = async (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(client.auth.login(params))
    }, 1000)
  })
}
