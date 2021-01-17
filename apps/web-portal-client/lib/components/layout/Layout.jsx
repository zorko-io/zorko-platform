import React from 'react'
import PropTypes from 'prop-types'

export function Layout(props) {
  const {sidebarRender, contentRender} = props
  return (
    <div className="max-w-7xl mx-auto md:flex">
      {sidebarRender()}
      {contentRender()}
    </div>
  )
}

Layout.propTypes = {
  sidebarRender: PropTypes.func,
  contentRender: PropTypes.func,
}

Layout.defaultProps = {
  sidebarRender: () => {},
  contentRender: () => {},
}
