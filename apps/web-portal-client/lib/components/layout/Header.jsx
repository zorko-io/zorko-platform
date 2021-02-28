import React, {useState} from 'react'
import {useAuth} from '../../features/auth/hooks'
import {MenuItem, DesktopMenu, MobileMenu} from './main-menu'
import {Logo} from '../Logo'
import {Button} from '../Button'
import {Image, ImageShapes} from '../Image'

export function Header() {
  const [shouldShowMobileMenu, toggleMobileMenu] = useState(false)
  const {userLogout} = useAuth()

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />

            <DesktopMenu>
              <MenuItem name="Home" link="/home" />
              <MenuItem name="Examples" link="/example" />
            </DesktopMenu>
          </div>
          <div className="flex items-center space-x-1">
            <Button label="logout" onClick={userLogout} />
            <div className="-mr-2 flex md:hidden">
              <Button onClick={() => toggleMobileMenu(!shouldShowMobileMenu)}>
                <Image shape={shouldShowMobileMenu ? ImageShapes.cross : ImageShapes.sandwich} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu isShown={shouldShowMobileMenu}>
        <MenuItem name="Home" link="/home" />
        <MenuItem name="Examples" link="/example" />
      </MobileMenu>
    </nav>
  )
}
