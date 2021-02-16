import cors from 'cors'
import {v4 as uuid} from 'uuid'
import bodyParser from 'body-parser'
import ExpressPino from 'express-pino-logger'
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

export const expressPino = function (logger) {
  return ExpressPino({
    logger,
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        traceID: req.headers['x-trace-id'] || uuid(),
      }),
      res: (res) => ({
        status: res.statusCode,
      }),
    },
  })
}
