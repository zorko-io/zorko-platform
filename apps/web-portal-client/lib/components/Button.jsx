import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

import {childrenPropTypes} from '../utils'

import './button.css'

export const ButtonTypes = {
  Primary: 'primary',
  Default: 'default',
  ActiveTab: 'active-tab',
  DefaultTab: 'default-tab',
}
export function Button(props) {
  const {label, onClick, children, type} = props

  return (
    <button
      type="button"
      className={className({
        'btn-default': type === ButtonTypes.Default,
        'btn-primary': type === ButtonTypes.Primary,
        'btn-tab': type === ButtonTypes.DefaultTab,
        'btn-tab-active': type === ButtonTypes.ActiveTab,
      })}
      onClick={onClick}
    >
      {children || label}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(Object.values(ButtonTypes)),
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: childrenPropTypes,
}

Button.defaultProps = {
  type: ButtonTypes.Default,
  label: '',
  onClick: () => {},
  children: null,
}
