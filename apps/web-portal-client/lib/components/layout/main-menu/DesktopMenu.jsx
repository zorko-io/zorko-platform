import React from 'react'
import PropTypes from 'prop-types'

export function DesktopMenu({children}) {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">{children}</div>
    </div>
  )
}

DesktopMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

DesktopMenu.defaultProps = {
  children: null,
}
