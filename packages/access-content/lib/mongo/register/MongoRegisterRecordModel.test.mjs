import test from '@zorko-io/tool-test-harness'
import {MongoRegisterRecordModel} from './MongoRegisterRecordModel'
import {toObjectId} from '../util/index.mjs'

test('enhance simple model', (t) => {

  t.is(MongoRegisterRecordModel.toCollectionName(), 'register')

  const doc = {
    _id: 'some-id-here',
    name: 'some-name',
    owner: 'some-owner'
  }

  const instance = new MongoRegisterRecordModel({doc})

  t.truthy(instance)

  t.deepEqual(instance.toJSON(), {
    id: 'some-id-here',
    name: 'some-name',
    owner: 'some-owner'
  })
  t.deepEqual(instance.toDocument(), {
    _id: toObjectId('some-id-here'),
    name: 'some-name',
    owner: 'some-owner'
  })

})

