import React, {useState} from 'react'

import {useAuth} from '../../features/auth/hooks'

import {MenuItem, DesktopMenu, MobileMenu} from './main-menu'

import {Logo} from '../Logo'
import {Button} from '../Button'
import {Image} from '../Image'
import {ImageShapes} from '../ImageShapes'

export function Header() {
  const [shouldShowMobileMenu, toggleMobileMenu] = useState(false)
  const {logout} = useAuth()

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />

            <DesktopMenu>
              <MenuItem name="Home" link="/home" />
              <MenuItem name="Examples" link="/example" />
              <MenuItem name="Teams" link="/team" />
            </DesktopMenu>
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

      <MobileMenu isShown={shouldShowMobileMenu}>
        <MenuItem name="Home" link="/home" />
        <MenuItem name="Examples" link="/example" />
        <MenuItem name="Teams" link="/team" />
        <MenuItem name="Contacts" link="/contacts" />
      </MobileMenu>
    </nav>
  )
}
