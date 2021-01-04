import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

export function MobileMenu({isShown, children}) {
  return (
    <div
      className={className('md:hidden', {
        block: isShown,
        hidden: !isShown,
      })}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {React.Children.map(children, (child) => React.cloneElement(child, {isMobile: true}))}
      </div>
    </div>
  )
}

MobileMenu.propTypes = {
  isShown: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

MobileMenu.defaultProps = {
  isShown: false,
  children: null,
}
