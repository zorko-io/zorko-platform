import React, {useState} from 'react'
import {Layout} from '../components/layout/Layout'
import {HeaderLayout} from '../components/layout/HeaderLayout'
import {SidebarLayout} from '../components/layout/SidebarLayout'
import {ContentLayout} from '../components/layout/ContentLayout'
import DesktopMenu from '../components/layout/DesktopMenu.jsx'
import MobileButtonMenu from '../components/layout/MobileButtonMenu.jsx'
import Logo from '../components/layout/Logo.jsx'
import MobileMenu from '../components/layout/MobileMenu.jsx'

export function App() {
  const [menuStatus, setMenuStatus] = useState(false)

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
              <DesktopMenu
                content={{
                  items: [
                    {desc: 'Home', link: '#'},
                    {desc: 'Product', link: '#'},
                    {desc: 'Teams', link: '#'},
                    {desc: 'About', link: '#'},
                  ],
                  active: 0,
                }}
              />
            </div>

            <MobileButtonMenu menuStatus={menuStatus} setMenuStatus={setMenuStatus} />
          </div>
        </div>
        <MobileMenu
          content={{
            items: [
              {desc: 'Home', link: '#'},
              {desc: 'Product', link: '#'},
              {desc: 'Teams', link: '#'},
              {desc: 'About', link: '#'},
            ],
            active: 0,
          }}
          menuStatus={menuStatus}
        />
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
          {/* /End replace */}
        </div>
      </main>

      {/*  <Layout
      renderHeader={() => <HeaderLayout />}
      renderSideBar={() => <SidebarLayout />}
      renderContent={() => <ContentLayout />}
              /> */}
    </div>
  )
}

App.propTypes = {}

App.defaultProps = {}
