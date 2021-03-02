import confme from 'confme'
import path from 'path'

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve('')

export function discoverConfig (){
  return confme(
    `${__dirname}/config/config.json`,
    `${__dirname}/config/config-schema.json`
  )
}