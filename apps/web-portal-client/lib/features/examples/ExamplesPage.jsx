import React from 'react'
import {NavBar} from '../../components/nav-bar/'
import {Sidebar} from '../../components/Sidebar'

export function ExamplesPage() {
  return (
    <div id="examples">
      <NavBar />

      <div className="w-full max-w-8xl mx-auto">
        <div className="lg:flex">
          <Sidebar
            description="Get started"
            items={[
              {name: 'Buttons', link: '#', active: true},
              {name: 'Forms', link: '#'},
            ]}
          />
          <div
            id="content-wrapper"
            className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible"
          >
            <div className="px-4 sm:px-6 xl:px-8 pt-10 pb-16">Content</div>
          </div>
        </div>
      </div>
    </div>
  )
}

ExamplesPage.propTypes = {}

ExamplesPage.defaultProps = {}
