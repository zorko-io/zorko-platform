import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import className from 'classnames'

export function MobileMenu(props) {
  const {items, isShown} = props

  return (
    <div
      className={className('md:hidden', {
        block: isShown,
        hidden: !isShown,
      })}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {items.map((item) => (
          <Link
            key={item.desc}
            to={item.link}
            className={className('block px-3 py-2 rounded-md text-base font-medium', {
              'text-white bg-gray-600': item.active,
              'text-gray-300 hover:text-white hover:bg-gray-700': !item.active,
            })}
          >
            {item.desc}
          </Link>
        ))}
      </div>
    </div>
  )
}

MobileMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      desc: PropTypes.string,
      link: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
  isShown: PropTypes.bool,
}

MobileMenu.defaultProps = {
  items: [],
  isShown: false,
}