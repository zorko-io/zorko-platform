import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

export function DesktopMenu(props) {
  const {items} = props

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {items.map((item) => (
          <a
            key={item.desc}
            href={item.link}
            className={className({
              'px-3 py-2 rounded-md text-sm font-medium': true,
              'text-gray-800 bg-gray-200': item.active,
              'text-gray-200 hover:text-black hover:bg-gray-200': !item.active,
            })}
          >
            {item.desc}
          </a>
        ))}
      </div>
    </div>
  )
}

DesktopMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      desc: PropTypes.string,
      link: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
}

DesktopMenu.defaultProps = {
  items: [],
}
