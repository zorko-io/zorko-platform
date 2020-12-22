import React from 'react'
import PropTypes from 'prop-types'

export function Image(props) {
  const {shape} = props

  const svgTemplates = {
    cross: 'M6 18L18 6M6 6l12 12',
    sandwich: 'M4 6h16M4 12h16M4 18h16',
  }
  return (
    <svg
      className="block h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={svgTemplates[shape]} />
    </svg>
  )
}

Image.propTypes = {
  shape: PropTypes.string,
}

Image.defaultProps = {
  shape: 'sandwich',
}
