import test from '@zorko-io/tool-test-harness'
import {enhanceWithMongo} from './enhanceWithMongo'
import {toObjectId} from './toObjectId'

class TestModel {

  #id = null
  #foo = null
  #bar= null

  constructor({id, foo, bar} = {}) {
    this.#id = id
    this.#foo = foo
    this.#bar = bar
  }

  get id () {
    return this.#id
  }

  get foo () {
    return this.#foo
  }

  get bar () {
    return this.#bar
  }

  toJSON() {
    return {
      id: this.id,
      foo: this.foo,
      bar: this.bar
    }
  }
}

test('enhance simple model', (t) => {

  let adapter = {
    schema: {
      bsonType: 'object',
      required: ['foo'],
      properties: {
        foo: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        bar: {
          bsonType: 'string',
          description: 'must be a string and is required'
        }
      }
    },
    index: [{name: 1, owner:1}, {unique: true}],
    toProps (doc) {

      return {
        id: doc._id.toString(),
        foo: doc.foo,
        bar: doc.bar
      }
    },
    toDocument(props) {
      let result = {}

      if (props.id){
        result._id = toObjectId(props.id)
      }

      return {
        bar: props.bar,
        foo: props.foo,
        ...result
      }
    }
  }
  const MongolizedModel = enhanceWithMongo({
    clazz: TestModel,
    adapter
  })

  t.is(MongolizedModel.schema, adapter.schema)
  t.is(MongolizedModel.toCollectionName, adapter.toCollectionName)
  t.is(MongolizedModel.index, adapter.index)

  const id = toObjectId()

  const doc = {
    _id: id,
    bar: 'some-bar',
    foo: 'some-foo'
  }

  const instance = new MongolizedModel({doc})

  t.truthy(instance)

  t.deepEqual(instance.toJSON(), {
    id: id.toString(),
    bar: 'some-bar',
    foo: 'some-foo'
  })

  const actualDoc = instance.toDocument()

  t.is(doc._id.toString(), actualDoc._id.toString())
  t.is(doc.bar, actualDoc.bar)
  t.is(doc.foo, actualDoc.foo)
})

