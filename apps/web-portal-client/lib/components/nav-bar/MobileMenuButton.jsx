import React from 'react'
import PropTypes from 'prop-types'

import {Image} from './Image'

export function MobileMenuButton(props) {
  const {shape, onToggle} = props

  return (
    <div className="-mr-2 flex md:hidden">
      <button
        type="submit"
        onClick={onToggle}
        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">Open main menu</span>

        <Image shape={shape} />
      </button>
    </div>
  )
}

MobileMenuButton.propTypes = {
  shape: PropTypes.string,
  onToggle: PropTypes.func,
}

MobileMenuButton.defaultProps = {
  shape: '',
  onToggle: () => {},
}
