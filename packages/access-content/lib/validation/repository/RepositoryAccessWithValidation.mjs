import {RepositoryAccess} from '../../core'
import {enhanceWithValidation} from '../enhanceWithValidation'

export const RepositoryAccessWithValidation = enhanceWithValidation({
  clazz: RepositoryAccess,
  rules: {
    add: {
      content: ['required', 'any_object'],
      resource: ['required', {
        nested_object: {
          parent: ['required', 'string'],
          name: ['required', 'string'],
          mime: ['required', 'string'],
          preview: ['string'],
          permission: ['required', 'string']
        }
      }],
      repository: ['required', {
        nested_object: {
          name: ['required', 'string'],
          owner: ['required', 'string']
        }
      }]
    },
    list: {
      path: ['string', {default: '/'}],
      filter: [{
        nested_object: {
          name: ['string'],
          mime: ['string'],
          permission: ['required', 'string']
        }
      }],
      limit: ['positive_integer', {default: 10}],
      offset: ['positive_integer', {default: 0}],
      repository: ['required', {
        nested_object: {
          name: ['required', 'string'],
          owner: ['required', 'string']
        }
      }],
    },
    get: {
      resource: ['required', {
        nested_object: {
          id: ['required', 'string']
        }
      }],
      repository: ['required', {
        nested_object: {
          name: ['required', 'string'],
          owner: ['required', 'string']
        }
      }]
    },
    remove: {
      resource: ['required', {
        nested_object: {
          id: ['required', 'string']
        }
      }],
      repository: ['required', {
        nested_object: {
          name: ['required', 'string'],
          owner: ['required', 'string']
        }
      }]
    }
  }
})