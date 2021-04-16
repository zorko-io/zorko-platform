import test from '@zorko-io/tool-test-harness'
import {setupDb} from '../../../test/helper'
import {createFacade, MimeTypes} from '../../index.mjs'
import {toObjectId} from '../util'
import _ from 'lodash'
import {NotFoundError} from '@zorko-io/util-error/lib/index.mjs'
import {variousDifferentContent, variousVisualizationContent} from './contentWithSpecs.data.mjs'
import {toArray} from '@zorko-io/util-lang/lib/index.mjs'

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

test.beforeEach((t) => {
  const barCharSpec = {
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
        {a: 'I', b: 52}
      ]
    },
    mark: 'bar',
    encoding: {
      x: {field: 'a', type: 'nominal', axis: {labelAngle: 0}},
      y: {field: 'b', type: 'quantitative'}
    }
  }

  const gantChart = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v5.json',
    'description': 'A simple bar chart with ranged data (aka Gantt Chart).',
    'data': {
      'values': [
        {'task': 'A', 'start': 1, 'end': 3},
        {'task': 'B', 'start': 3, 'end': 8},
        {'task': 'C', 'start': 8, 'end': 10}
      ]
    },
    'mark': 'bar',
    'encoding': {
      'y': {'field': 'task', 'type': 'ordinal'},
      'x': {'field': 'start', 'type': 'quantitative'},
      'x2': {'field': 'end'}
    }
  }

  const mime = MimeTypes.VegaLite

  const defaultJoeRepo = {
    name: 'default',
    owner: 'joe'
  }

  const contentWithBarChart = {
    content: {spec: barCharSpec},
    mime
  }

  t.context.manyContent = _.cloneDeep(variousVisualizationContent)
  t.context.manyDiffContent = _.cloneDeep(variousDifferentContent)

  t.context.contentForFewSpecs = [
    {content: {spec: barCharSpec}, mime},
    {content: {spec: gantChart}, mime}
  ]
  t.context.barCharSpec = barCharSpec
  t.context.contentWithBarChart = contentWithBarChart
  t.context.defaultJoeRepo = defaultJoeRepo

  t.context.uploadVariousContent= async ({items, content, repo} = {}) => {
    for (let newContent of items) {
      await content.add({
        repository: repo,
        content: newContent
      })
    }
  }
})

test.serial('add new content', async (t) => {
  const {content, contentWithBarChart, defaultJoeRepo, barCharSpec} = t.context

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

  await t.throwsAsync(async () => {
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
  const {content, contentWithBarChart, defaultJoeRepo} = t.context

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

  await t.throwsAsync(async () => {
    await content.get({
      repository: defaultJoeRepo.name,
      owner: defaultJoeRepo.owner,
      id: result.id
    })
  }, {
    instanceOf: NotFoundError
  })

})

test.serial('query fee items', async (t) => {
  const {content, contentForFewSpecs, defaultJoeRepo} = t.context

  for (let newContent of contentForFewSpecs) {
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

test.serial('query limit and offset', async (t) => {
  const {content, defaultJoeRepo, manyContent} = t.context

  for (let newContent of manyContent) {
    await content.add({
      repository: defaultJoeRepo,
      content: newContent
    })
  }

  let it = content.iterate({
    query: {
      limit: 2
    },
    repository: defaultJoeRepo
  })


  let actual = await toArray(it)

  function removeIds (arr) {
    return arr.map(i => {delete i.id; return i})
  }

  t.is(actual.length, 2)
  t.deepEqual(removeIds(actual), [manyContent[0], manyContent[1]])


  it = content.iterate({
    query: {
      limit: 2,
      offset: 2
    },
    repository: defaultJoeRepo
  })

  actual = await toArray(it)

  t.is(actual.length, 2)
  t.deepEqual(removeIds(actual), [manyContent[2],manyContent[3]])
})


test.serial('query with filter', async (t ) => {
  const {uploadVariousContent, defaultJoeRepo, content, manyDiffContent} = t.context

  await uploadVariousContent({
    content,
    repo: defaultJoeRepo,
    items: manyDiffContent
  })

  let results = content.iterate({
    query: {
      filter: [
        {field: 'mime', equal: MimeTypes.VegaLiteTheme}
      ]
    },
    repository: defaultJoeRepo
  })

  results = await toArray(results)

  t.is(results.length, 1)


  let actual = results[0]

  delete actual.id

  t.deepEqual(actual, manyDiffContent.pop())
})

// TODO: probably, need to move to mongo aggregate to properly support it
// test.serial('query with total', async (t ) => {
//   const {uploadVariousContent, defaultJoeRepo, content, manyDiffContent} = t.context
//
//   const results = await uploadVariousContent({
//     content,
//     repo: defaultJoeRepo,
//     items: manyDiffContent
//   })
//
//   t.is(results.total, 6)
//
// })