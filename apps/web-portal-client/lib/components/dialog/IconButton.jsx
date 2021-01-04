import React from 'react'
import PropTypes from 'prop-types'

export function IconButton({onClick, children, className}) {
  return (
    <button
      onClick={onClick}
      className={`focus:outline-none focus:border-none hover:bg-gray-400 hover:bg-opacity-25 p-2 rounded-full inline-flex items-center ${className}`}
    >
      {children}
    </button>
  )
}

IconButton.propTypes = {
  '': PropTypes.func,
}

IconButton.defaultProps = {
  '': () => {},
}
