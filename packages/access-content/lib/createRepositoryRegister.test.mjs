import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createRepositoryRegister} from './createRepositoryRegister.mjs'
import {NotFoundError} from '@zorko-io/util-error/lib/index.mjs'

setupDb(test, async (t) => {
  const {db} = t.context
  t.context.register = await createRepositoryRegister(db, {log: console})
})

test.serial('allocate, get and remove - with happy path', async (t) => {
  const {register} = t.context
  const allocatedSpace = await register.add('joe')

  t.truthy(allocatedSpace)

  const allocatedSpaceProps = allocatedSpace.properties

  const space = await register.get(allocatedSpaceProps.id)
  const spaceProps = space.properties

  t.deepEqual(spaceProps, allocatedSpaceProps)

  await register.remove(allocatedSpaceProps.id)

  await t.throwsAsync(async () => {
    await register.get(allocatedSpaceProps.id)
  }, {
    instanceOf: NotFoundError,
    message: `Can't find space by #id=${allocatedSpaceProps.id}`
  })

})

test.serial('iterate on empty and should not fail on second call', async (t) => {
  const {register} = t.context
  const owner = 'joe'

  let iterable = register.iterate({owner})

  let result = await iterable[Symbol.asyncIterator]().next()

  t.true(result.done)

  result = await iterable[Symbol.asyncIterator]().next()

  t.true(result.done)
})

test.serial('allocate new and iterate with happy path', async (t) => {
  const {register} = t.context

  t.truthy(register)

  const owner = 'joe'
  const justCreated = await register.add(owner)
  const iterable = register.iterate({owner})

  let results = []

  for await (const space of iterable) {
    results.push(space)
  }

  t.true(results.length === 1)

  let joeSpace = results[0]
  const joeSpaceProperties = joeSpace.properties

  t.deepEqual(joeSpaceProperties, justCreated.properties)
})

test.serial('add new resource with happy path', async (t) => {
  const {register} = t.context
  const space = await register.add('joe')
  const resource = {
    path: '/',
    name: 'Bar Char',
    preview: 'url/to/preview/here',
    mime: 'application/json+vega-lite'
  }

  const content = {
    spec : {
      "schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "A simple bar chart with embedded data.",
      "data": {
        "values": [
          {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
          {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
          {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
        ]
      },
      "mark": "bar",
      "encoding": {
        "x": {"field": "a", "type": "nominal", "axis": {"labelAngle": 0}},
        "y": {"field": "b", "type": "quantitative"}
      }
    }
  }

  const actual = await space.add({
    path: resource.path,
    name: resource.name,
    content,
    mime: resource.mime,
    preview: resource.preview
  })

  t.truthy(actual)
  t.truthy(actual.properties.id)

  t.deepEqual(actual.properties.name, resource.name)
  t.deepEqual(actual.properties.path, '/' + resource.name)
  t.deepEqual(actual.properties.mime, resource.mime)
  t.deepEqual(actual.properties.preview, resource.preview)

  t.true(typeof actual.properties.content == 'string')
})

