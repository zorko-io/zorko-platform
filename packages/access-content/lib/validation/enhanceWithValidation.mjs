import {createValidator} from '@zorko-io/util-validation'
import {ResourceAccessError} from '@zorko-io/util-error/lib/index.mjs'

export function enhanceWithValidation ({clazz: Clazz, wrap} = {}) {
  let  origin

  function AccessWithValidation (context, deps) {
    origin = new Clazz(context, deps)
  }

  AccessWithValidation.prototype = Object.create(Clazz.prototype)

  const methods = wrap()

  for (let method of Object.keys(methods)) {
    const rule = methods[method]
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