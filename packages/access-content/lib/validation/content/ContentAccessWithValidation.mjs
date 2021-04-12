import {ContentAccess} from '../../core'
import assert from 'assert'
import {createValidator} from '@zorko-io/util-validation'
import {ResourceAccessError} from '@zorko-io/util-error/lib/index.mjs'

const genericContentRules = {
  content: ['required','any_object'],
  mime: ['required', 'string'],
  config: 'any_object',
  repo: ['required','string'],
  owner: ['required', 'string']
}

export class ContentAccessWithValidation extends ContentAccess {

  #origin = null
  #newContent = null

  constructor(context = {}) {
    assert(context.origin, 'should have #origin')

    super();

    this.#origin = context.origin
    this.#newContent = createValidator(genericContentRules)
  }

  async add(params) {
    const {error, result} = await this.#newContent.parse(params)

    if (error) {
      // wrap with ResourceAccessError to force upper layer to do proper validation
      throw new ResourceAccessError(error.message)
    }

    return this.#origin.add.apply(this.#origin, [result])
  }
}