import {UseCase} from '@zorko-io/util-use-case'

// TODO: integrate with an access layer
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
            "description": "A simple pie chart with labels.",
            "data": {
              "values": [
                {"category": "a", "value": 4},
                {"category": "b", "value": 6},
                {"category": "c", "value": 10},
                {"category": "d", "value": 3},
                {"category": "e", "value": 7},
                {"category": "f", "value": 8}
              ]
            },
            "encoding": {
              "theta": {"field": "value", "type": "quantitative", "stack": true},
              "color": {"field": "category", "type": "nominal", "legend": null}
            },
            "layer": [{
              "mark": {"type": "arc", "outerRadius": 80}
            }, {
              "mark": {"type": "text", "radius": 90},
              "encoding": {
                "text": {"field": "category", "type": "nominal"}
              }
            }],
            "view": {"stroke": null}
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
        },
        {
          id: '8ded2b31-6b57-4056-8c57-acc04366bf0f',
          format: 'vega-lite',
          createdAt: '2021-03-07 21:14:00',
          spec: {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "description": "A simple radial chart with embedded data.",
            "data": {
              "values": [12, 23, 47, 6, 52, 19]
            },
            "layer": [{
              "mark": {"type": "arc", "innerRadius": 20, "stroke": "#fff"}
            },{
              "mark": {"type": "text", "radiusOffset": 10},
              "encoding": {
                "text": {"field": "data", "type": "quantitative"}
              }
            }],
            "encoding": {
              "theta": {"field": "data", "type": "quantitative", "stack": true},
              "radius": {"field": "data", "scale": {"type": "sqrt", "zero": true, "rangeMin": 20}},
              "color": {"field": "data", "type": "nominal", "legend": null}
            },
            "view": {"stroke": null}
          }
        }
      ],
    }
  }
}
