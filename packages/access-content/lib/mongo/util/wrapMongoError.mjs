import {AlreadyExistsError, ResourceAccessError} from '@zorko-io/util-error'

export function wrapMongoError (error, message, deps = {}) {
  const { log } = deps

  if (error.code === 11000 || error.code === 48) {
    log.info(error.message)
    throw new AlreadyExistsError(message)
  } else {
    throw new ResourceAccessError(error.message)
  }


}