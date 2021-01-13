import React from 'react'
import PropTypes from 'prop-types'
import {childrenPropTypes} from '../utils/childrenPropTypes'

import './button.css'

export function Button(props) {
  const {label, onClick, children, addClasses} = props

  return (
    <button type="button" className={`btn-general ${addClasses}`} onClick={onClick}>
      {children || label}
    </button>
  )
}

Button.propTypes = {
  addClasses: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: childrenPropTypes,
}

Button.defaultProps = {
  addClasses: '',
  label: '',
  onClick: () => {},
  children: null,
}
