import React from 'react'

export function Content(props) {
  const {innerContentRender} = props
  return (
    <main>
      <div className="mx-auto py-6 sm:px-6 lg:px-8 ">
        <div className="flex flex-wrap">{innerContentRender()}</div>
      </div>
    </main>
  )
}
