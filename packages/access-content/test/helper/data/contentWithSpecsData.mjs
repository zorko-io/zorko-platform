import {MimeTypes} from '../../../lib/core/index.mjs'

// TODO: 'access-content' manage test data (move to proper place)

export const barCharSpec =  {
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

export const gantChart = {
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

export  const areaHorizontal = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "Horizon Graph with 2 layers. (See https://idl.cs.washington.edu/papers/horizon/ for more details on Horizon Graphs.)",
  "width": 300,
  "height": 50,
  "data": {
    "values": [
      {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
      {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
      {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
      {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
      {"x": 9,  "y": 52}, {"x": 10, "y": 48},
      {"x": 11, "y": 24}, {"x": 12, "y": 49},
      {"x": 13, "y": 87}, {"x": 14, "y": 66},
      {"x": 15, "y": 17}, {"x": 16, "y": 27},
      {"x": 17, "y": 68}, {"x": 18, "y": 16},
      {"x": 19, "y": 49}, {"x": 20, "y": 15}
    ]
  },
  "layer": [{
    "mark": {"type": "area", "clip": true, "orient": "vertical"},
    "encoding": {
      "x": {
        "field": "x", "type": "quantitative",
        "scale": {"zero": false, "nice": false}
      },
      "y": {
        "field": "y", "type": "quantitative",
        "scale": {"domain": [0,50]}
      },
      "opacity": {"value": 0.6}
    }
  }, {
    "transform": [
      {
        "calculate": "datum.y - 50",
        "as": "ny"
      }
    ],
    "mark": {"type": "area", "clip": true, "orient": "vertical"},
    "encoding": {
      "x": {
        "field": "x", "type": "quantitative"
      },
      "y": {
        "field": "ny", "type": "quantitative",
        "scale": {"domain": [0,50]},
        "axis": {"title": "y"}
      },
      "opacity": {"value": 0.3}
    }
  }],
  "config": {
    "area": {"interpolate": "monotone"}
  }
}

export const barBinned = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
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
      "bin": {
        "binned": true,
        "step": 2
      },
      "type": "quantitative"
    },
    "x2": {"field": "bin_end"},
    "y": {
      "field": "count",
      "type": "quantitative"
    }
  }
}

export const barColorDisabled = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A bar chart that directly encodes color names in the data.",
  "data": {
    "values": [
      {
        "color": "red",
        "b": 28
      },
      {
        "color": "green",
        "b": 55
      },
      {
        "color": "blue",
        "b": 43
      }
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "color",
      "type": "nominal"
    },
    "y": {
      "field": "b",
      "type": "quantitative"
    },
    "color": {
      "field": "color",
      "type": "nominal",
      "scale": null
    }
  }
}

const darkTheme = {
  "background": "#333",
  "title": {"color": "#fff"},
  "style": {"guide-label": {"fill": "#fff"}, "guide-title": {"fill": "#fff"}},
  "axis": {"domainColor": "#fff", "gridColor": "#888", "tickColor": "#fff"}
}

const visualizationMime = MimeTypes.VegaLite
const vegaLiteThemeMime = MimeTypes.VegaLiteTheme

export const variousVisualizationContent = [
  // TODO: remove 'spec' inside the content, just spread spec inside
  { content: { spec: barCharSpec }, mime: visualizationMime},
  { content: { spec: gantChart }, mime: visualizationMime},
  { content: { spec: areaHorizontal }, mime: visualizationMime},
  { content: { spec: barBinned }, mime: visualizationMime},
  { content: { spec: barColorDisabled }, mime: visualizationMime},
]

export const variousDifferentContent = [
  ...variousVisualizationContent,
  {content: { spec: darkTheme }, mime: vegaLiteThemeMime}
]