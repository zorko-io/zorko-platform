import React from 'react'
import PropTypes from 'prop-types'

export function Button({children, type = 'button', onClick, className = ''}) {
  return (
    <button
      className={`bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  '': PropTypes.func,
}

Button.defaultProps = {
  '': () => {},
}
