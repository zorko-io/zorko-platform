export default {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  description: 'A basic bar chart example, with value labels shown upon mouse hover.',
  width: 400,
  height: 200,
  padding: 5,

  data: [
    {
      name: 'table',
    },
  ],

  signals: [
    {
      name: 'tooltip',
      value: {},
      on: [
        {events: 'rect:mouseover', update: 'datum'},
        {events: 'rect:mouseout', update: '{}'},
      ],
    },
    {
      name: 'hover',
      value: {},
      on: [{events: 'rect:mouseover', update: 'datum'}],
    },
  ],

  scales: [
    {
      name: 'xscale',
      type: 'band',
      domain: {data: 'table', field: 'category'},
      range: 'width',
      padding: 0.05,
      round: true,
    },
    {
      name: 'yscale',
      domain: {data: 'table', field: 'amount'},
      nice: true,
      range: 'height',
    },
  ],

  axes: [
    {orient: 'bottom', scale: 'xscale'},
    {orient: 'left', scale: 'yscale'},
  ],

  marks: [
    {
      type: 'rect',
      from: {data: 'table'},
      encode: {
        enter: {
          x: {scale: 'xscale', field: 'category'},
          width: {scale: 'xscale', band: 1},
          y: {scale: 'yscale', field: 'amount'},
          y2: {scale: 'yscale', value: 0},
        },
        update: {
          fill: {value: 'steelblue'},
        },
        hover: {
          fill: {value: 'red'},
        },
      },
    },
    {
      type: 'text',
      encode: {
        enter: {
          align: {value: 'center'},
          baseline: {value: 'bottom'},
          fill: {value: '#333'},
        },
        update: {
          x: {scale: 'xscale', signal: 'tooltip.category', band: 0.5},
          y: {scale: 'yscale', signal: 'tooltip.amount', offset: -2},
          text: {signal: 'tooltip.amount'},
          fillOpacity: [{test: 'datum === tooltip', value: 0}, {value: 1}],
        },
      },
    },
  ],
}
