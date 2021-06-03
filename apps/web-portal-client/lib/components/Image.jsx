import React from 'react'
import PropTypes from 'prop-types'

export const ImageShapes = {
  cross: 'M6 18L18 6M6 6l12 12',
  sandwich: 'M4 6h16M4 12h16M4 18h16',
  save:
    'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4',
}
export function Image(props) {
  const {shape} = props

  return (
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
  )
}

Image.propTypes = {
  shape: PropTypes.oneOf(Object.values(ImageShapes)),
}

Image.defaultProps = {
  shape: ImageShapes.sandwich,
}
