import React, {useState} from 'react'

import {Logo} from './Logo'
import {DesktopMenu} from './DesktopMenu'
import {LoginButton} from './LoginButton'
import {MobileMenuButton} from './MobileMenuButton'
import {MobileMenu} from './MobileMenu'

export function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <DesktopMenu
              items={[
                {desc: 'Home', link: '#', active: true},
                {desc: 'Product', link: '#'},
                {desc: 'Teams', link: '#'},
                {desc: 'About', link: '#'},
              ]}
            />
          </div>
          <div className="flex items-center space-x-1">
            <LoginButton />
            <MobileMenuButton
              shape={showMobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              onToggle={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>
        </div>
      </div>
      <MobileMenu
        items={[
          {desc: 'Home', link: '#', active: true},
          {desc: 'Product', link: '#'},
          {desc: 'Teams', link: '#'},
          {desc: 'About', link: '#'},
        ]}
        isShown={showMobileMenu}
      />
    </nav>
  )
}
