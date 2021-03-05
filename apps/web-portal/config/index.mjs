import confme from 'confme'
import path from 'path'

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve('')
// TODO: add npm post install script to generate combined configs


export function discoverConfig (){
  return confme(
    `${__dirname}/config/config.json`,
    `${__dirname}/config/config-schema.json`
  )
}