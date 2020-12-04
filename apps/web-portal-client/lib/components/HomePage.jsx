import React, {useState} from 'react'

import {Logo} from './Logo'
import {Card} from './Card'
import {UserProfile} from './UserProfile'
import {LoginButton} from './LoginButton'

import {DesktopMenu, MobileMenu, MobileMenuButton} from './main-menu'

export function HomePage() {
  const [menuStatus, setMenuStatus] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)

  return (
    <div>
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
            <div className="flex space-x-1">
              <LoginButton loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
              <MobileMenuButton menuStatus={menuStatus} setMenuStatus={setMenuStatus} />
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
          menuStatus={menuStatus}
        />
      </nav>

      <div className="max-w-7xl mx-auto md:flex">
        {loginStatus ? <UserProfile /> : ''}

        <div className="block divide-y w-full px-2">
          <header>
            <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl leading-tight text-gray-900">Visualizations</h1>
            </div>
          </header>

          <main>
            <div className="mx-auto py-6 sm:px-6 lg:px-8">
              <div className="flex flex-wrap">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
