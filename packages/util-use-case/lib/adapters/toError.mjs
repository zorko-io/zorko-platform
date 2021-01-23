import {MockLogger} from '@zorko-io/util-logger'
import {ValidationError} from '@zorko-io/util-error'

export function toError(error, req, res, deps = {log: new MockLogger()}) {
  if (error instanceof ValidationError) {
    res.send({
      status: 0,
      error: error.toJSON(),
    })
  } else {
    const log = deps.log

    log.fatal({
      REQUEST_URL: req.url,
      REQUEST_PARAMS: req.params,
      REQUEST_BODY: req.body,
      ERROR_STACK: error.stack,
    })

    res.send({
      status: 0,
      error: {
        name: 'ServerError',
        message: 'Please, contact your system administrator!',
      },
    })
  }
}
