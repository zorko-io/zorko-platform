import {UserFacedError} from './UserFacedError.mjs'

export class NotFoundError extends UserFacedError {
  constructor(message) {
    super(message || 'Not found')
  }
}
