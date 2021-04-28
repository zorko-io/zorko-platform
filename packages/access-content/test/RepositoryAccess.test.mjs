import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createFacade, PermissionDefaults} from '../lib'

setupDb(test, async (t) => {
  const {db} = t.context
  try {
    const facade = await createFacade(db)
    t.context.facade = facade
    t.context.repository = facade.repository
  } catch (err) {
    console.error(`Can't create repo register`, err)
    throw err
  }
})

test.beforeEach((t) => {
  t.context.defaultBarChartResource = {
    parent: '/',
    name: 'Bar Char',
    preview: 'url/to/preview/here',
    mime: 'application/json+vega-lite',
    permission: PermissionDefaults.Public
  }
  t.context.defaultBarChartContent = {
    spec: {
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
    },
  }
  t.context.defaultJoeRepository = {
    name : 'default',
    owner: 'joe'
  }
})

test.serial('add - new resource with happy path', async (t) => {
  const {repository,
    defaultBarChartResource,
    defaultBarChartContent,
    defaultJoeRepository
  } = t.context

  const actual = await repository.add({
    resource: defaultBarChartResource,
    content: defaultBarChartContent,
    repository: defaultJoeRepository
  })

  t.truthy(actual)
  t.truthy(actual.id)

  t.deepEqual(actual.name, defaultBarChartResource.name, 'should match #name')
  t.deepEqual(actual.parent, defaultBarChartResource.parent, 'should match  #parent')
  t.deepEqual(actual.path, '/Bar Char', 'should match  #path')
  t.deepEqual(actual.mime, defaultBarChartResource.mime, 'should match  #mime')
  t.deepEqual(actual.preview, defaultBarChartResource.preview, 'should match #preview')
  t.deepEqual(actual.permission, defaultBarChartResource.permission, 'should match #permission')

  t.true(typeof actual.content == 'string')
})

test.serial('get resource - happy path', async (t) => {
  const {repository} = t.context
  const resource = {
    parent: '/',
    name: 'Bar Char',
    preview: 'url/to/preview/here',
    mime: 'application/json+vega-lite',
  }

  const content = {
    spec: {
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
    },
  }

  const actual = await repository.add({
    resource: {
      parent: resource.parent,
      name: resource.name,
      mime: resource.mime,
      preview: resource.preview,
      permission: PermissionDefaults.Public
    },
    content,
    repository: {
      name : 'default',
      owner: 'joe'
    }
  })

  t.truthy(actual)
  t.truthy(actual.id)

  t.deepEqual(actual.name, resource.name, 'should match #name')
  t.deepEqual(actual.path, '/Bar Char', 'should match  #path')
  t.deepEqual(actual.mime, resource.mime, 'should match  #mime')
  t.deepEqual(actual.preview, resource.preview, 'should match #preview')

  t.true(typeof actual.content == 'string')
})


