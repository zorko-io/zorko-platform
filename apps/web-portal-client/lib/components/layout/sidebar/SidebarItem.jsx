import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

export function SidebarItem({name, link}) {
  return (
    <NavLink
      className="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-400"
      activeClassName="underline text-gray-900"
      to={link}
    >
      <span className="rounded-md absolute inset-0 bg-cyan-50 opacity-0" />
      <span className="relative">{name}</span>
    </NavLink>
  )
}

SidebarItem.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
}

SidebarItem.defaultProps = {
  name: '',
  link: '',
}
