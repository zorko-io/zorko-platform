import React, {useState} from 'react'

import {Logo} from './Logo'
import {DesktopMenu} from './DesktopMenu'
import {LoginButton} from './LoginButton'
import {ButtonSVG} from './ButtonSVG'
import {MobileMenu} from './MobileMenu'

export function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

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
            <LoginButton
              label={isLogged ? 'Logout' : 'Login'}
              onClick={() => setIsLogged(!isLogged)}
            />
            <ButtonSVG
              shape={showMobileMenu ? 'sandwich' : 'cross'}
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
