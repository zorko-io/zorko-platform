import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import className from 'classnames'

export function MenuItem({name, link, isMobile}) {
  const usualCSS = className({
    'text-gray-200 hover:text-black hover:bg-gray-200 block text-base': !isMobile,
    'text-gray-300 hover:text-white hover:bg-gray-700 text-sm': isMobile,
  })

  const activeCSS = className('px-3 py-2 rounded-md font-medium', {
    'text-gray-800 bg-gray-200': !isMobile,
    'text-white bg-gray-600': isMobile,
  })

  return (
    <NavLink key={name} to={link} className={usualCSS} activeClassName={activeCSS}>
      {name}
    </NavLink>
  )
}

MenuItem.propTypes = {
  '': PropTypes.func,
}

MenuItem.defaultProps = {
  '': () => {},
}
