import {UseCase} from '@zorko-io/util-use-case'

export class SpecList extends UseCase {
  // eslint-disable-next-line no-unused-vars
  async run(params) {
    return {
      total: 2,
      pagesLeft: 0,
      items: [
        {
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
        },
        {
          id: 'de034563-0c3d-4ace-8e85-739f1a5d3ea5',
          format: 'vega-lite',
          createdAt: '2021-03-07 21:14:00',
          spec: {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": {
              "values": [
                {"bin_start": 8, "bin_end": 10, "count": 7},
                {"bin_start": 10, "bin_end": 12, "count": 29},
                {"bin_start": 12, "bin_end": 14, "count": 71},
                {"bin_start": 14, "bin_end": 16, "count": 127},
                {"bin_start": 16, "bin_end": 18, "count": 94},
                {"bin_start": 18, "bin_end": 20, "count": 54},
                {"bin_start": 20, "bin_end": 22, "count": 17},
                {"bin_start": 22, "bin_end": 24, "count": 5}
              ]
            },
            "mark": "bar",
            "encoding": {
              "x": {
                "field": "bin_start",
                "bin": {"binned": true, "step": 2}
              },
              "x2": {"field": "bin_end"},
              "y": {
                "field": "count",
                "type": "quantitative"
              }
            }
          }
        }
      ],
    }
  }
}
