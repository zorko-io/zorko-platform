import {RepositoryAccess} from '../../core'
import {enhanceWithValidation} from '../enhanceWithValidation'

export const RepositoryAccessWithValidation = enhanceWithValidation({
  clazz: RepositoryAccess,
  rules: {
    add: {
      content: ['required', 'any_object'],
      resource: ['required', {
        nested_object: {
          name: ['required', 'string'],
          mime: ['required', 'string'],
          preview: ['string'],
          permission: ['required', 'string']
        }
      }],
      folder: ['required', {
        nested_object: {
          repo: ['required', 'string'],
          owner: ['required', 'string'],
          path: ['required', 'string']
        }
      }]
    },
    list: {
      folder: [['required'], {
        nested_object: {
          repo: ['required', 'string'],
          owner: ['required', 'string'],
          path: ['string', {default: '/'}]
        }
      }],
      filter: [{
        nested_object: {
          name: ['string'],
          mime: ['string'],
          permission: ['string']
        }
      }],
      limit: ['positive_integer', {default: 10}],
      offset: ['positive_integer', {default: 0}]
    },
    get: {
      uri: ['required', {
        nested_object: {
          repo: ['required', 'string'],
          owner: ['required', 'string'],
          path: ['required', 'string']
        }
      }]
    },
    remove: {
      uri: ['required', {
        nested_object: {
          repo: ['required', 'string'],
          owner: ['required', 'string'],
          path: ['required', 'string']
        }
      }]
    }
  }
})