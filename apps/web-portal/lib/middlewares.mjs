import cors from 'cors'
import bodyParser from 'body-parser'
import {InvalidJsonError} from '@zorko-io/util-error'

export const json = (config = {jsonBodySizeLimit: 1024 * 1024}) =>
  bodyParser.json({
    limit: config.jsonBodySizeLimit,
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf)
      } catch (e) {
        res.send({
          status: 0,
          error: {
            code: 'BROKEN_JSON',
            message: 'Please, verify your json',
          },
        })
        throw new InvalidJsonError('BROKEN_JSON')
      }
    },
  })

export const urlencoded = bodyParser.urlencoded({extended: true})

// TODO: Provide origin configuration for an implemented auth
// label: enhancement
export const corsMiddleware = cors({origin: '*'}) // Allow any origin because NOT USE cookies and basic auth
