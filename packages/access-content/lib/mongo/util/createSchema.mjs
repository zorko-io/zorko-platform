import assert from 'assert'
import {ResourceAccessError} from '@zorko-io/util-error'

/**
 * Creates mongo schema with metadata from mongo model
 * @param {Object} options
 * @param {ObjectConstructor} options.clazz - mongo model class
 * @param {String} options.name - name of the collection
 * @param {Object} deps
 */

export async function createSchema(options= {}, deps = {}) {
  const { clazz , name} = options
  const { log, db } = deps

  assert(clazz, 'should have a model a #class with mongo options')
  assert(name, 'should have a #collection name')
  assert(log, 'should have #log')
  assert(db, 'should have #db')

  try {
    const config = {}

    if (clazz.schema) {
      config.validator = {
        $jsonSchema: clazz.schema
      }
    }

    const collection = await db.createCollection(name, config)

    if (clazz.index) {
      // TODO: 'access-context' make more generic
      collection.createIndex(clazz.index[0], clazz.index[1])
    }

    return collection

  } catch (error) {
    if (error.codeName === 'NamespaceExists') {
      log.info(`Collection #name=${name} was already created, skipping...`)
    } else {
      throw new ResourceAccessError(error.message)
    }
  }

}