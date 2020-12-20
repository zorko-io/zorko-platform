import React from 'react'
import PropTypes from 'prop-types'

export function Layout(props) {
  const {navbarRender, sidebarRender, headerRender, contentRender} = props
  return (
    <div>
      {navbarRender()}

      <div className="max-w-7xl mx-auto md:flex">
        {sidebarRender()}

        <div className="block divide-y w-full px-2">
          {headerRender()}
          {contentRender()}
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  navbarRender: PropTypes.func,
  sidebarRender: PropTypes.func,
  headerRender: PropTypes.func,
  contentRender: PropTypes.func,
}

Layout.defaultProps = {
  navbarRender: () => {},
  sidebarRender: () => {},
  headerRender: () => {},
  contentRender: () => {},
}
