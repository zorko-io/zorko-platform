import React from 'react'

const MobileMenu = (props) => {
  const {items, active} = props.content

  const itemsClass = 'block px-3 py-2 rounded-md text-base font-medium'
  const menuClass = (props.menuStatus ? 'block' : 'hidden') + ' md:hidden'

  return (
    <div className={menuClass}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={
              index === active
                ? itemsClass + ' text-white bg-gray-600'
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

export default MobileMenu
