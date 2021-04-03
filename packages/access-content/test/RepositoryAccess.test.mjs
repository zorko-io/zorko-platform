import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createFacade} from '../lib'

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

// test.serial('add new resource with happy path', async (t) => {
//   const {register} = t.context
//   const resource = {
//     path: '/',
//     name: 'Bar Char',
//     preview: 'url/to/preview/here',
//     mime: 'application/json+vega-lite',
//   }
//
//   const content = {
//     spec: {
//       schema: 'https://vega.github.io/schema/vega-lite/v5.json',
//       description: 'A simple bar chart with embedded data.',
//       data: {
//         values: [
//           {a: 'A', b: 28},
//           {a: 'B', b: 55},
//           {a: 'C', b: 43},
//           {a: 'D', b: 91},
//           {a: 'E', b: 81},
//           {a: 'F', b: 53},
//           {a: 'G', b: 19},
//           {a: 'H', b: 87},
//           {a: 'I', b: 52},
//         ],
//       },
//       mark: 'bar',
//       encoding: {
//         x: {field: 'a', type: 'nominal', axis: {labelAngle: 0}},
//         y: {field: 'b', type: 'quantitative'},
//       },
//     },
//   }
//
//   const actual = await repository.add({
//     path: resource.path,
//     name: resource.name,
//     content,
//     mime: resource.mime,
//     preview: resource.preview,
//   })
//
//   t.truthy(actual)
//   t.truthy(actual.properties.id)
//
//   t.deepEqual(actual.properties.name, resource.name)
//   t.deepEqual(actual.properties.path, '/' + resource.name)
//   t.deepEqual(actual.properties.mime, resource.mime)
//   t.deepEqual(actual.properties.preview, resource.preview)
//
//   t.true(typeof actual.properties.content == 'string')
// })
