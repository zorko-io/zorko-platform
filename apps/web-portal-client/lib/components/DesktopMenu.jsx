import React from 'react'
import PropTypes from 'prop-types'

export function DesktopMenu(props) {
  const {items, active} = props.content
  const itemsClass = 'px-3 py-2 rounded-md text-sm font-medium'
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {items.map((item, index) => (
          <a
            key={item.desc}
            href={item.link}
            className={
              index === active
                ? `${itemsClass} text-gray-800 bg-gray-200`
                : `${itemsClass} text-gray-200 hover:text-black hover:bg-gray-200`
            }
          >
            {item.desc}
          </a>
        ))}
      </div>
    </div>
  )
}

DesktopMenu.propTypes = {
  content: PropTypes.object,
}

DesktopMenu.defaultProps = {
  content: {},
}
