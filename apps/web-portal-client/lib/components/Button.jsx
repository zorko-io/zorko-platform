import React from 'react'
import PropTypes from 'prop-types'

import './button.css'

export function Button(props) {
  const {label, handleClick, children, addClasses} = props

  return (
    <button type="button" className={`btn-general ${addClasses}`} onClick={handleClick}>
      {children || label}
    </button>
  )
}

Button.propTypes = {
  addClasses: PropTypes.string,
  label: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

Button.defaultProps = {
  addClasses: '',
  label: '',
  handleClick: () => {},
  children: null,
}
