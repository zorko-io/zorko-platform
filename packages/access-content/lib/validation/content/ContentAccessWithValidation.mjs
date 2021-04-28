import {ContentAccess} from '../../core'
import {enhanceWithValidation} from '../enhanceWithValidation'

export const ContentAccessWithValidation = enhanceWithValidation({
  clazz: ContentAccess,
  rules: {
    add: {
      content: ['required',{nested_object: {
          mime: ['required', 'string'],
          content: ['required', 'any_object'],
          config: 'any_object'
        }}],
      repository: ['required', { nested_object: {
          name: ['required', 'string'],
          owner: ['required', 'string']
        }}]
    },
    iterate: {
      query: [{nested_object: {
          select: [{
            'list_of': [ 'required',  'string' ]
          }],
          filter: [{
            'list_of': [ 'required',  {'nested_object': {
                field: ['required','string'],
                equal: ['required', 'string']
              }} ]
          }],
          limit: ['positive_integer', { default: 10 }],
          offset: ['positive_integer', { default: 0 }]
        }}, {default: {limit: 10, offset: 0}}],
      repository: ['required', { nested_object: {
          name: ['required', 'string'],
          owner: ['required', 'string']
        }}]
    },
    get: {
      id: ['required', 'string'],
      repository:  ['required', 'string'],
      owner: ['required', 'string']
    },
    remove: {
      id: ['required', 'string'],
      repository:  ['required', 'string'],
      owner: ['required', 'string']
    }
  }
})