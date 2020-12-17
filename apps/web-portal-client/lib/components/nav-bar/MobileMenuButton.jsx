import React from 'react'
import PropTypes from 'prop-types'
import './mobileMenuButton.css'

export function MobileMenuButton(props) {
  const {shape, onToggle} = props
  const template = {
    "crossShape" :'M6 18L18 6M6 6l12 12'
    "sandwichShape": 'M6 18L18 6M6 6l12 12'
  }


  return (
    <div className="-mr-2 flex md:hidden">
      <button type="submit" onClick={onToggle} className="btn-menu">
        <span className="sr-only">Open main menu</span>

        <svg
          className="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={shape} />
        </svg>
      </button>
    </div>
  )
}

MobileMenuButton.propTypes = {
  shape: PropTypes.string,
  onToggle: PropTypes.func,
}

MobileMenuButton.defaultProps = {
  shape: '',
  onToggle: () => {},
}
