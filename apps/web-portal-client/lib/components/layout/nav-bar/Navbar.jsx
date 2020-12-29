import React, {useState} from 'react'
import {useAuth} from '../../../features/auth/hooks'
import {MobileMenu} from './MobileMenu'
import {DesktopMenu} from './DesktopMenu'
import {Logo} from '../../Logo'
import {Button} from '../../Button'
import {Image} from '../../Image'
import {ImageShapes} from '../../ImageShapes'

export function Navbar() {
  const [shouldShowMobileMenu, toggleMobileMenu] = useState(false)
  const {logout} = useAuth()

  // TODO: DesktopMenu/MobileMenu
  // use 'children' instead of 'items'
  // labels: tech-debt

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="w-44">
              <Logo />
            </div>

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
            <Button label="login" handleClick={logout} />
            <div className="-mr-2 flex md:hidden">
              <Button handleClick={() => toggleMobileMenu(!shouldShowMobileMenu)}>
                <Image shape={shouldShowMobileMenu ? ImageShapes.cross : ImageShapes.sandwich} />
              </Button>
            </div>
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
        isShown={shouldShowMobileMenu}
      />
    </nav>
  )
}
