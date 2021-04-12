import test from '@zorko-io/tool-test-harness'
import {setupDb} from '../../../test/helper'
import {createFacade, MimeTypes} from '../../index.mjs'

setupDb(test, async (t) => {
  const {db} = t.context
  try {
    let facade = await createFacade(db)
    t.context.facade = facade
    t.context.register = facade.register
    t.context.content = facade.content
  } catch (err) {
    console.error(`Can't create access content facade`, err)
    throw err
  }
})

test.beforeEach((t)=> {
  const barCharSpec =  {
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

  const mime = MimeTypes.VegaLite

  const defaultJoeRepo = {
    name: 'default',
    owner: 'joe'
  }

  const contentWithBarChart = {
    content: { spec :barCharSpec},
    mime
  }

  t.context.barCharSpec = barCharSpec
  t.context.contentWithBarChart = contentWithBarChart
  t.context.defaultJoeRepo = defaultJoeRepo
})

test.serial('add new record', async (t) => {
  const {content, contentWithBarChart , defaultJoeRepo, barCharSpec} = t.context

  const result = await content.add({
    content: contentWithBarChart,
    repository: defaultJoeRepo
  })

  t.truthy(result)

  t.deepEqual(result.content, {spec: barCharSpec})
  t.is(result.mime, contentWithBarChart.mime)
  t.truthy(typeof result.id === 'string' && result.id)
})