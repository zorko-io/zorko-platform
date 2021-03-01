import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import className from 'classnames'

export function MenuItem({name, link, isMobile, dataTestId}) {
  const usualCSS = className('px-3 py-2 rounded-md font-medium', {
    'text-gray-200 hover:text-black hover:bg-gray-200 text-sm': !isMobile,
    'text-gray-300 hover:text-white hover:bg-gray-700 block text-base': isMobile,
  })

  const activeCSS = className({
    'text-gray-800 bg-gray-200': !isMobile,
    'text-white bg-gray-600': isMobile,
  })

  return (
    <NavLink
      to={link}
      key={name}
      className={usualCSS}
      activeClassName={activeCSS}
      data-test-id={dataTestId}
    >
      {name}
    </NavLink>
  )
}

MenuItem.propTypes = {
  dataTestId: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string,
  isMobile: PropTypes.bool,
}

MenuItem.defaultProps = {
  dataTestId: '',
  name: '',
  link: '',
  isMobile: false,
}
