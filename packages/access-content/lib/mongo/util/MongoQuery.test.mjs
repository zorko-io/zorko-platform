import test from '@zorko-io/tool-test-harness'
import {MongoQuery} from './MongoQuery.mjs'
import sinon from 'sinon'

test.beforeEach((t) => {
  const collection = {}

  collection.aggregate = sinon.stub().returns(collection)
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

  query.makeResultsCursor()

  t.deepEqual(collection.aggregate.firstCall.firstArg, [
    {$match: {}},
    {$skip: 5},
    {$limit: 10},

  ])
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

  query.makeResultsCursor()

  t.deepEqual(collection.aggregate.firstCall.firstArg, [
    {$match: { mime: 'text/plain'}},
    {$skip: 5},
    {$limit: 10}
  ])
})

test('test total count', (t) => {
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

  query.makeTotalCursor()

  t.deepEqual(collection.aggregate.firstCall.firstArg, [
    {$match: { mime: 'text/plain'}},
    {$count: 'total'},
  ])
})