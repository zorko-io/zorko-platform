import React from 'react'
import PropTypes from 'prop-types'

export function Layout(props) {
  const {headerRender, sidebarRender, contentRender} = props
  return (
    <div>
      {headerRender()}
      <div className="max-w-7xl mx-auto md:flex">
        {sidebarRender()}
        {contentRender()}
      </div>
    </div>
  )
}

Layout.propTypes = {
  headerRender: PropTypes.func,
  sidebarRender: PropTypes.func,
  contentRender: PropTypes.func,
}

Layout.defaultProps = {
  headerRender: () => {},
  sidebarRender: () => {},
  contentRender: () => {},
}
