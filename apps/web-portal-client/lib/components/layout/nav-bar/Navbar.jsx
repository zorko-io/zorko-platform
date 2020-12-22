import React, {useState} from 'react'

import {Logo} from './Logo'
import {DesktopMenu} from './DesktopMenu'
import {Button} from './Button'
import {Image} from './Image'
import {MobileMenu} from './MobileMenu'

import {useDispatch} from 'react-redux'
import {userLogout} from '../../../features/auth/effects'

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(userLogout())
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <DesktopMenu
              items={[
                {desc: 'Home', link: '/home', active: true},
                {desc: 'Examples', link: '/example'},
                {desc: 'Teams', link: '#'},
                {desc: 'About', link: '#'},
              ]}
            />
          </div>
          <div className="flex items-center space-x-1">
            <Button
              label="login"
              onclick={() => {
                handleLogout()
              }}
            />
            <div className="-mr-2 flex md:hidden"></div>
            <Button onclick={() => setShowMobileMenu(!showMobileMenu)}>
              <Image shape={showMobileMenu ? 'cross' : 'sandwich'} />
            </Button>
            <div />
          </div>
        </div>
      </div>
      <MobileMenu
        items={[
          {desc: 'Home', link: '/home', active: true},
          {desc: 'Examples', link: '/example'},
          {desc: 'Teams', link: '#'},
          {desc: 'About', link: '#'},
        ]}
        isShown={showMobileMenu}
      />
    </nav>
  )
}
