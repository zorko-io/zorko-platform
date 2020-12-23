import React, {useState} from 'react'

import {Logo} from './Logo'
import {DesktopMenu} from './MenuLayouts'
import {LoginButton} from './LoginButton'
import {MobileMenuButton} from './MobileMenuButton'
import {MobileMenu} from './menu/MobileMenu'
import {DesktopLayout, MobileLayout} from './MenuLayouts'

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeItemMenu, setActiveItemMenu] = useState('/home')

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />

            <Menu layout={DesktopLayout}>
              <MenuItem
                desc="Home"
                link="/home"
                activeItem={activeItemMenu}
                onChange={setActiveItemMenu}
              />
              <MenuItem desc="Examples" link="/example" />
              <MenuItem desc="Teams" link="#" />
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

      <Menu
        layout="mobile"
        activeItem={activeItemMenu}
        onChange={setActiveItemMenu}
        isShown={showMobileMenu}
      >
        <MenuItem desc="Home" link="/home" />
        <MenuItem desc="Examples" link="/example" />
        <MenuItem desc="Teams" link="#" />
      </Menu>
    </nav>
  )
}
