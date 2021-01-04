import React from 'react'
import PropTypes from 'prop-types'

export function Content(props) {
  const {title, innerContentRender} = props
  return (
    <div className="block divide-y w-full px-2">
      <header>
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl leading-tight text-gray-900">{title}</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8 ">
          <div className="flex flex-wrap">{innerContentRender()}</div>
        </div>
      </main>
    </div>
  )
}

Content.propTypes = {
  title: PropTypes.string,
  innerContentRender: PropTypes.func,
}

Content.defaultProps = {
  title: '',
  innerContentRender: () => {},
}
