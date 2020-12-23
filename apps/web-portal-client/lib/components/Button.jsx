import React from 'react'
import PropTypes from 'prop-types'

import './button.css'

export function Button(props) {
  const {label, handleClick, children} = props

  return (
    <button type="button" className="btn-general" onClick={handleClick}>
      {children || label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

Button.defaultProps = {
  label: '',
  handleClick: () => {},
  children: null,
}
