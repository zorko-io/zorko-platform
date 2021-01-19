import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

import {childrenPropTypes} from '../utils/childrenPropTypes'

import './button.css'

export function Button(props) {
  const {label, onClick, children, type} = props

  return (
    <button
      type="button"
      className={className({
        'btn-default': type === 'default',
        'btn-primary': type === 'primary',
      })}
      onClick={onClick}
    >
      {children || label}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: childrenPropTypes,
}

Button.defaultProps = {
  type: 'default',
  label: '',
  onClick: () => {},
  children: null,
}
