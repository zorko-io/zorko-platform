import React, {useEffect} from 'react'
import {VegaLite} from 'react-vega'
import {useSpecs} from '../../hooks'

export function VegaLiteExample() {
  const {fetch, error, isLoading, specs} = useSpecs()

  useEffect(() => fetch(), [])

  if (error) return null

  if (isLoading) return <>Data fetching...</>

  return specs.map((item) => (
    <VegaLite key={item.id} spec={JSON.parse(JSON.stringify(item.spec))} />
  ))
}
