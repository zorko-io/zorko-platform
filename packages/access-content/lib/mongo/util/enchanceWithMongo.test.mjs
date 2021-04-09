import test from '@zorko-io/tool-test-harness'
import {RegisterRecordModel} from '../../core'
import {enhanceWithMongo} from './enchanceWithMongo'
import {toObjectId} from './toObjectId.mjs'

test('enhance simple model', (t) => {

  const MongolizedModel = enhanceWithMongo({
    clazz: RegisterRecordModel,
    adapter: {
      schema: {
        bsonType: 'object',
        required: ['name', 'owner'],
        properties: {
          name: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          owner: {
            bsonType: 'string',
            description: 'must be a string and is required'
          }
        }
      },
      index: [{name: 1, owner:1}, {unique: true}],
      toProps (doc) {
        return {
          id: doc._id.toString(),
          owner: doc.owner,
          name: doc.name
        }
      },
      toDocument(props) {
        let result = {}

        if (props.id){
          result._id = toObjectId(props.id)
        }

        return {
          name: props.name,
          owner: props.owner,
          ...result
        }
      }
    }
  })

  const doc = {
    _id: 'some-id-here',
    name: 'some-name',
    owner: 'some-owner'
  }

  const instance = new MongolizedModel({doc})

  t.truthy(instance)

  t.deepEqual(instance.toJSON(), { id: 'some-id-here', name: 'some-name', owner: 'some-owner'})

})

