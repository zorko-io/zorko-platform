import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

export function MenuItem(props) {
  const {name, link, isActive, isMobile} = props

  return (
    <Link
      key={name}
      to={link}
      onClick={() => !isActive}
      className={className('px-3 py-2 rounded-md font-medium', {
        'text-gray-800 bg-gray-200': isActive && !isMobile,
        'text-gray-200 hover:text-black hover:bg-gray-200': !isActive && !isMobile,
        'text-white bg-gray-600': isActive && isMobile,
        'text-gray-300 hover:text-white hover:bg-gray-700': !isActive && isMobile,
        'text-sm': isMobile,
        'block text-base': !isMobile,
      })}
    >
      {name}
    </Link>
  )
}

test
test2

MenuItem.propTypes = {
  '': PropTypes.func,
}

MenuItem.defaultProps = {
  '': () => {},
}
