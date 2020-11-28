import React from 'react'

const DesktopMenu = (props) => {
  const {items, active} = props.content
  const itemsClass = 'px-3 py-2 rounded-md text-sm font-medium'
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={items.link}
            className={
              index === active
                ? itemsClass + ' text-white bg-gray-900'
                : itemsClass + ' text-gray-300 hover:text-white hover:bg-gray-700'
            }
          >
            {item.desc}
          </a>
        ))}
      </div>
    </div>
  )
}

export default DesktopMenu
