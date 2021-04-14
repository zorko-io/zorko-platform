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

const contentQueryRules = {
  query: [{nested_object: {
      select: [{
        'list_of': [ 'required',  'string' ]
      }],
      limit: ['positive_integer', { default: 10 }],
      offset: ['positive_integer', { default: 0 }]
  }}],
  repository: ['required', { nested_object: {
      name: ['required', 'string'],
      owner: ['required', 'string']
  }}]
}
export class ContentAccessWithValidation extends ContentAccess {

  #origin = null
  #newContentValidator = null
  #compoundContentIdValidator = null
  #iterateQueryValidator = null

  constructor(context = {}) {
    assert(context.origin, 'should have #origin')

    super();

    this.#origin = context.origin
    this.#newContentValidator = createValidator(newContentRules)
    this.#compoundContentIdValidator = createValidator(compoundContextIdRules)
    this.#iterateQueryValidator = createValidator(contentQueryRules)
  }

  async add(params) {
    return this.#execWithValidation(
      params,
      this.#origin.add,
      this.#newContentValidator
    )
  }

  iterate(query= {}) {
    return this.#execWithValidation(
      query,
      this.#origin.iterate,
      this.#iterateQueryValidator
    )
  }

  async get(params) {
    return this.#execWithValidation(
      params,
      this.#origin.get,
      this.#compoundContentIdValidator
    )
  }

  async remove(params) {
    return this.#execWithValidation(
      params,
      this.#origin.remove,
      this.#compoundContentIdValidator
    )
  }


  #execWithValidation = (params, method ,validator) => {
    const {error, result} = validator.parseSync(params)

    if (error) {
      // wrap with ResourceAccessError to force upper
      // layer to do proper validation
      throw new ResourceAccessError(error.message)
    }

    return method.apply(this.#origin, [result])
  }
}