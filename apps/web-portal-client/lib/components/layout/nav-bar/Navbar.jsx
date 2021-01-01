import React, {useState} from 'react'

import {LoginButton} from './LoginButton'
import {MobileMenuButton} from './MobileMenuButton'
import {DesktopLayout, MobileLayout} from './MenuLayouts'
import {Logo} from './Logo'
import {Menu} from './Menu'
import {MenuItem} from './MenuItem'

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />

            <Menu layout={DesktopLayout}>
              <MenuItem name="Home" link="/home" />
              <MenuItem name="Examples" link="/example" />
              <MenuItem name="Teams" link="/team" />
            </Menu>
          </div>
          <div className="flex items-center space-x-1">
            <LoginButton />
            <MobileMenuButton
              shape={showMobileMenu ? 'cross' : 'sandwich'}
              onToggle={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>
        </div>
      </div>

      <Menu layout={MobileLayout} isShown={showMobileMenu}>
        <MenuItem name="Home" link="/home" />
        <MenuItem name="Examples" link="/example" />
        <MenuItem name="Teams" link="/team" />
        <MenuItem name="Contacts" link="/contacts" />
      </Menu>
    </nav>
  )
}
