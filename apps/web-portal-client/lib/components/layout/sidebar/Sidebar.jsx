import React from 'react'
import PropTypes from 'prop-types'

export function Sidebar({title, children}) {
  return (
    <div
      id="sidebar"
      className="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden"
    >
      <div
        id="navWrapper"
        className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
      >
        <div className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white" />
        <nav
          id="nav"
          className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-16 sticky?lg:h-(screen-18)"
        >
          <ul>
            <li className="mt-8">
              <h5 className="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">
                {title}
              </h5>
              <ul>{children}</ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

Sidebar.defaultProps = {
  title: '',
  children: null,
}
