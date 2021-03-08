import React, {useEffect} from 'react'
import {VegaLite} from 'react-vega'
import {useSpecs} from '../../hooks'

export function VegaLiteExample() {
  const {fetch, error, isLoading, specs} = useSpecs()

  useEffect(() => fetch(), [])

  if (error) return null

  if (isLoading) return <>Data fetching...</>

  return specs.map((item) => (
    <span key={item.id} data-test-id="vegaLiteItem">
      <VegaLite spec={JSON.parse(JSON.stringify(item.spec))} />
    </span>
  ))
}
