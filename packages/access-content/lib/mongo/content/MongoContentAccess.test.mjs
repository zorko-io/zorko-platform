import test from '@zorko-io/tool-test-harness'
import {setupDb} from '../../../test/helper'
import {createFacade, MimeTypes} from '../../index.mjs'
import {toObjectId} from '../util'
import {NotFoundError} from '@zorko-io/util-error/lib/index.mjs'

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

  const gantChart = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple bar chart with ranged data (aka Gantt Chart).",
    "data": {
      "values": [
        {"task": "A", "start": 1, "end": 3},
        {"task": "B", "start": 3, "end": 8},
        {"task": "C", "start": 8, "end": 10}
      ]
    },
    "mark": "bar",
    "encoding": {
      "y": {"field": "task", "type": "ordinal"},
      "x": {"field": "start", "type": "quantitative"},
      "x2": {"field": "end"}
    }
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

  t.context.contentForFewSpecs = [
    {content: {spec: barCharSpec}, mime},
    {content: {spec: gantChart}, mime}
  ]
  t.context.barCharSpec = barCharSpec
  t.context.contentWithBarChart = contentWithBarChart
  t.context.defaultJoeRepo = defaultJoeRepo
})

test.serial('add new content', async (t) => {
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

test.serial('fails with not found', async (t) => {
  const {content, defaultJoeRepo} = t.context
  let id = toObjectId().toString()

  await t.throwsAsync(async  () => {
    await content.get({
      repository: defaultJoeRepo.name,
      owner: defaultJoeRepo.owner,
      id: id
    })
  }, {
    instanceOf: NotFoundError,
    message: `Can't find content with #id=${id}, #repo=default, #owner=joe`
  })
})

test.serial('add, get and remove one item', async (t) => {
  const {content, contentWithBarChart , defaultJoeRepo} = t.context

  let result = await content.add({
    content: contentWithBarChart,
    repository: defaultJoeRepo
  })

  let actual = await content.get({
    repository: defaultJoeRepo.name,
    owner: defaultJoeRepo.owner,
    id: result.id
  })

  t.deepEqual(result, actual)

  await content.remove({
    id: result.id,
    repository: defaultJoeRepo.name,
    owner: defaultJoeRepo.owner
  })

  await t.throwsAsync(async  () => {
    await content.get({
      repository: defaultJoeRepo.name,
      owner: defaultJoeRepo.owner,
      id: result.id
    })
  }, {
    instanceOf: NotFoundError,
  })

})

test.serial('query fee items', async (t) => {

  // start with two, then extend for more that limit/offset

  const { content, contentForFewSpecs, defaultJoeRepo} = t.context

  for (let newContent  of contentForFewSpecs) {
    await content.add({
      repository: defaultJoeRepo,
      content: newContent
    })
  }

  const items = content.iterate({
    repository: defaultJoeRepo
  })

  t.truthy(items)

  let result = await items[Symbol.asyncIterator]().next()

  let value = result.value

  t.truthy(value.id)
  t.falsy(result.done)

  delete value.id

  t.deepEqual(result.value, contentForFewSpecs[0])

  result = await items[Symbol.asyncIterator]().next()

  value = result.value

  t.truthy(value.id)
  t.falsy(result.done)

  delete value.id
  t.deepEqual(result.value, contentForFewSpecs[1])


  result = await items[Symbol.asyncIterator]().next()

  t.falsy(result.value)
  t.truthy(result.done)

})