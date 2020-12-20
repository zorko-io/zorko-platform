import React from 'react'
import PropTypes from 'prop-types'

export function Header(props) {
  const {title} = props
  return (
    <header>
      <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl leading-tight text-gray-900">{title}</h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: '',
}
