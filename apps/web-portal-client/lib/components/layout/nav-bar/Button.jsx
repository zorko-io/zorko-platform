import React from 'react'
import PropTypes from 'prop-types'

import './button.css'

export function Button(props) {
  const {label, onclick, children} = props

  return (
    <button type="button" className="btn-general" onClick={onclick}>
      {children || label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
}

Button.defaultProps = {
  label: '',
}
