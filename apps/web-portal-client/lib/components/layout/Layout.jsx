import React from 'react'

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
