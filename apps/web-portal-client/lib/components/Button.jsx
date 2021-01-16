import React from 'react'
import PropTypes from 'prop-types'
import {childrenPropTypes} from '../utils/childrenPropTypes'

import './button.css'

export function Button(props) {
  const {label, onClick, children, cssClass} = props

  return (
    <button type="button" className={`btn-general ${cssClass}`} onClick={onClick}>
      {children || label}
    </button>
  )
}

Button.propTypes = {
  cssClass: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: childrenPropTypes,
}

Button.defaultProps = {
  cssClass: '',
  label: '',
  onClick: () => {},
  children: null,
}
