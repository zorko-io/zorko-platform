import React from 'react'
import PropTypes from 'prop-types'
import './mobileMenuButton.css'

export function MobileMenuButton(props) {
  const {shape, onToggle} = props
  const svgTemplates = {
    cross: 'M6 18L18 6M6 6l12 12',
    sandwich: 'M4 6h16M4 12h16M4 18h16',
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={svgTemplates[shape]}
          />
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
