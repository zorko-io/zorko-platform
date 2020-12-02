import React from 'react'
import PropTypes from 'prop-types'

export function MobileMenuButton(props) {
  const {menuStatus, setMenuStatus} = props
  const d = menuStatus ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
  return (
    <div className="-mr-2 flex md:hidden">
      {/* Mobile menu button */}
      <button
        type="submit"
        onClick={() => setMenuStatus(!menuStatus)}
        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">Open main menu</span>
        {/* Heroicon name: menu Menu open: "hidden", Menu closed: "block" */}
        {/* Heroicon name: x Menu open: "block", Menu closed: "hidden" */}
        <svg
          className="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
        </svg>
      </button>
    </div>
  )
}

MobileMenuButton.propTypes = {
  menuStatus: PropTypes.bool,
  setMenuStatus: PropTypes.func,
}

MobileMenuButton.defaultProps = {
  menuStatus: false,
  setMenuStatus: () => {},
}
