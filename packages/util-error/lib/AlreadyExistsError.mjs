import {UserFacedError} from './UserFacedError.mjs'

export class AlreadyExistsError extends UserFacedError {
  constructor(message) {
    super(message || 'Already Exists')
  }
}
