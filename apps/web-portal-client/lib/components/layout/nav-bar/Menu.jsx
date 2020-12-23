import React from 'react'
import PropTypes from 'prop-types'

export function Menu(props) {
  const {layout: Layout, isShown, children} = props

  return (
    <Layout
      renderItems={() => {
        children
      }}
      isShown={isShown}
    />
  )
}
