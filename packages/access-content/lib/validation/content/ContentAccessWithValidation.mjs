import {ContentAccess} from '../../core'
import assert from 'assert'
import {createValidator} from '@zorko-io/util-validation'
import {ResourceAccessError} from '@zorko-io/util-error/lib/index.mjs'

const newContentRules = {
  content: ['required',{nested_object: {
      mime: ['required', 'string'],
      content: ['required', 'any_object'],
      config: 'any_object'
    }}],
  repository: ['required', { nested_object: {
      name: ['required', 'string'],
      owner: ['required', 'string']
    }}]
}

const compoundContextIdRules = {
  id: ['required', 'string'],
  repository:  ['required', 'string'],
  owner: ['required', 'string']
}

export class ContentAccessWithValidation extends ContentAccess {

  #origin = null
  #newContentValidator = null
  #compoundContentIdValidator = null

  constructor(context = {}) {
    assert(context.origin, 'should have #origin')

    super();

    this.#origin = context.origin
    this.#newContentValidator = createValidator(newContentRules)
    this.#compoundContentIdValidator = createValidator(compoundContextIdRules)
  }

  async add(params) {
    const {error, result} = await this.#newContentValidator.parse(params)

    if (error) {
      // wrap with ResourceAccessError to force upper
      // layer to do proper validation
      throw new ResourceAccessError(error.message)
    }

    return this.#origin.add.apply(this.#origin, [result])
  }

  async get(params) {
    const {error, result} = await this.#compoundContentIdValidator.parse(params)

    if (error) {
      // wrap with ResourceAccessError to force upper
      // layer to do proper validation
      throw new ResourceAccessError(error.message)
    }

    return this.#origin.add.apply(this.#origin, [result])
  }
}