import React from 'react'
import PropTypes from 'prop-types'

export function LoginButton(props) {
  const {label, onClick} = props

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        {label}
      </button>
    </div>
  )
}

LoginButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
}

LoginButton.defaultProps = {
  label: '',
  onClick: () => {},
}
