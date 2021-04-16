import test from '@zorko-io/tool-test-harness'
import {MongoQuery} from './MongoQuery.mjs'
import sinon from 'sinon'

test.beforeEach((t) => {
  const collection = {}

  collection.find = sinon.stub().returns(collection)
  collection.limit = sinon.stub().returns(collection)
  collection.skip = sinon.stub().returns(collection)

  t.context = {
    collection
  }
})

test('test filter of particular fields', (t) => {
  const { collection } = t.context

  const query = new MongoQuery({
    query: {
      limit: 10,
      offset: 5
    }
    }, {
    collection
  })

  t.truthy(query)

  query.toCursor()

  t.deepEqual(collection.find.firstCall.firstArg, {})
  t.is(collection.limit.firstCall.firstArg, 10)
  t.is(collection.skip.firstCall.firstArg, 5)
  // filter: [{ field: 'mime', equal: 'text/plain'}]
})

test('test basic filter', (t) => {
  const { collection } = t.context

  const query = new MongoQuery({
    query: {
      filter: [
        { field: 'mime', equal: 'text/plain'}
      ],
      limit: 10,
      offset: 5
    }
  }, {
    collection
  })

  t.truthy(query)

  query.toCursor()

  t.deepEqual(collection.find.firstCall.firstArg, {
    mime: 'text/plain'
  })
  t.is(collection.limit.firstCall.firstArg, 10)
  t.is(collection.skip.firstCall.firstArg, 5)
})