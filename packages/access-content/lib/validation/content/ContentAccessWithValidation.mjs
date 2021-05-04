import {ContentAccess} from '../../core'
import {enhanceWithValidation} from '../enhanceWithValidation'

export const ContentAccessWithValidation = enhanceWithValidation({
  clazz: ContentAccess,
  rules: {
    writeAsObject: {
      content:  ['required', 'any_object'],
      uri: ['required', {
        nested_object: {
          repo: ['required', 'string'],
          owner: ['required', 'string'],
          path: ['required', 'string']
        }
      }],
      permission: ['string']
    },
    readAsObject: {
      uri: ['required', {
        nested_object: {
          repo: ['required', 'string'],
          owner: ['required', 'string'],
          path: ['required', 'string']
        }
      }]
    },
    readMetadata: {
      uri: ['required', {
        nested_object: {
          repo: ['required', 'string'],
          owner: ['required', 'string'],
          path: ['required', 'string']
        }
      }]
    },
    removeContent: {
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