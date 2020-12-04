import React from 'react'
import PropTypes from 'prop-types'

export function MobileMenu(props) {
  const {items, menuStatus} = props

  const itemsClass = 'block px-3 py-2 rounded-md text-base font-medium'
  const menuClass = `${menuStatus ? 'block' : 'hidden'} md:hidden`

  return (
    <div className={menuClass}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {items.map((item) => (
          <a
            key={item.desc}
            href={item.link}
            className={
              item.active
                ? `${itemsClass} text-white bg-gray-600`
                : `${itemsClass} text-gray-300 hover:text-white hover:bg-gray-700`
            }
          >
            {item.desc}
          </a>
        ))}
      </div>
    </div>
  )
}

MobileMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  menuStatus: PropTypes.bool,
}

MobileMenu.defaultProps = {
  items: [],
  menuStatus: false,
}
