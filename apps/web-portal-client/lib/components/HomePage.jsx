import React, {useState} from 'react'

import {UserProfile} from './UserProfile'
import {Header} from './Header'
import {Content} from './Content'
import {NavBar} from './nav-bar'

export function HomePage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  return (
    <div>
      <NavBar
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />

      <div className="max-w-7xl mx-auto md:flex">
        {isLogged ? <UserProfile /> : ''}

        <div className="block divide-y w-full px-2">
          <Header />
          <Content />
        </div>
      </div>
    </div>
  )
}
