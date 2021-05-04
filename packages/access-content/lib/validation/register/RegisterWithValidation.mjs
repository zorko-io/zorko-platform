import {RegisterAccess} from '../../core'
import {enhanceWithValidation} from '../enhanceWithValidation'

export const RegisterAccessWithValidation = enhanceWithValidation({
  clazz: RegisterAccess,
  rules: {
    add: {
      repo: ['required', 'string'],
      owner: ['required', 'string']
    },
    iterate: {
      owner: ['string']
    }
  }
})