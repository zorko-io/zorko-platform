import {UseCase} from '@zorko-io/util-use-case'

export class SpecRead extends UseCase {
  // eslint-disable-next-line no-unused-vars
  async run(params) {
    return {
      status: 0,
      data: {
        id: '2e3140e8-ed62-4843-929f-65becf347721',
        format: 'vega-lite',
        createdAt: '2021-03-07 21:14:00',
        spec: {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
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
    }
  }
}