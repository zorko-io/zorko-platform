import React from 'react'
import {Card} from './Card'

export function Content() {
  return (
    <main>
      <div className="mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </main>
  )
}
