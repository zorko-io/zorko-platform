import assert from 'assert'
import {createValidator} from '@zorko-io/util-validation'
import {ResourceAccessError, ValidationError} from '@zorko-io/util-error'

export function enhanceWithValidation ({clazz: Clazz, wrap} = {}) {
  let  origin

  function AccessWithValidation (context = {}) {
    assert(context.origin, 'should have #origin in context')

    origin = context.origin
  }

  AccessWithValidation.prototype = Object.create(Clazz.prototype)

  const methods = wrap()

  for (let method of Object.keys(methods)) {
    const rule = methods[method]

    if (!Clazz.prototype[method]) {
      let errors = {
        NOT_MATCHED_METHOD_NAME: {
          inClazz: Clazz.name,
          method
        }
      }
      throw new ValidationError({
        errors: errors,
        message: `ValidationError: ${JSON.stringify(errors)}`
      })
    }

    const validator = createValidator(rule)

    AccessWithValidation.prototype[method] = (params) => {
      const {error, result} = validator.parseSync(params)

      if (error) {
        // wrap with ResourceAccessError to force upper
        // layer to do proper validation
        throw new ResourceAccessError(error.message)
      }

      return origin[method].call(origin, result)
    }
  }

  AccessWithValidation.constructor = AccessWithValidation

  return AccessWithValidation
}