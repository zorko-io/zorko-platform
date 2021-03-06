import React from 'react'
import {Vega} from 'react-vega'
import spec from './spec'

export function VegaExample() {
  function handleHover() {}
  const signalListeners = {hover: handleHover}

  const barData = {
    table: [
      {category: 'A', amount: 28},
      {category: 'B', amount: 55},
      {category: 'C', amount: 43},
      {category: 'D', amount: 91},
      {category: 'E', amount: 81},
      {category: 'F', amount: 53},
      {category: 'G', amount: 19},
      {category: 'H', amount: 87},
    ],
  }

  return <Vega spec={spec} data={barData} signalListeners={signalListeners} />
}
