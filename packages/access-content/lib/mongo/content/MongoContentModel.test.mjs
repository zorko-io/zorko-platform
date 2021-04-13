import test from '@zorko-io/tool-test-harness'
import {MongoContentModel} from './MongoContentModel'
import {toObjectId} from '../util'
import {MimeTypes} from '../../core'

test('enhance simple model', (t) => {

  t.is(MongoContentModel.toCollectionName({owner:'foo',repo:"bar"}), 'content.foo.bar')

  const id = toObjectId()

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart with embedded data.',
    data: {
      values: [
        {a: 'A', b: 28},
        {a: 'B', b: 55},
        {a: 'C', b: 43},
        {a: 'D', b: 91},
        {a: 'E', b: 81},
        {a: 'F', b: 53},
        {a: 'G', b: 19},
        {a: 'H', b: 87},
        {a: 'I', b: 52},
      ],
    },
    mark: 'bar',
    encoding: {
      x: {field: 'a', type: 'nominal', axis: {labelAngle: 0}},
      y: {field: 'b', type: 'quantitative'},
    },
  }

  const content = {spec}

  const doc = {
    _id: id,
    content: MongoContentModel.encodeSpecialCharters(content),
    mime: MimeTypes.VegaLite,
  }

  const props = {
    id: id.toString(),
    content,
    mime: MimeTypes.VegaLite,
  }

  const instance = new MongoContentModel({doc})

  t.truthy(instance)

  t.deepEqual(instance.toJSON(), props)
  let actual = instance.toDocument()

  t.is(actual._id.toString(), doc._id.toString())

})

