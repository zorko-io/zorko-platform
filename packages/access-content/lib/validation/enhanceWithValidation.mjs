import assert from 'assert'
import {createValidator} from '@zorko-io/util-validation'
import {ResourceAccessError, ValidationError} from '@zorko-io/util-error'

export function enhanceWithValidation({clazz: Clazz, rules} = {}) {

  checkMatchedMethods({
    rules,
    Clazz
  })

  function AccessWithValidation(context = {}) {
    assert(context.origin, 'should have #origin in context')

    const origin = context.origin

    for (let method of Object.keys(rules)) {
      const rule = rules[method]

      const validator = createValidator(rule)

      this[method] = (params) => {
        const {error, result} = validator.parseSync(params)

        if (error) {
          // rules with ResourceAccessError to force upper
          // layer to do proper validation
          throw new ResourceAccessError(error.message)
        }

        return origin[method].apply(origin, [result])
      }
    }
  }

  AccessWithValidation.prototype = Object.create(Clazz.prototype)

  AccessWithValidation.constructor = AccessWithValidation

  return AccessWithValidation
}

function checkMatchedMethods({rules, Clazz} = {}) {
  for (let method of Object.keys(rules)) {
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
  }
}