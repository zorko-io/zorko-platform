import React, {useState} from 'react'

import DesktopMenu from './DesktopMenu.jsx'
import MobileMenuButton from './MobileMenuButton.jsx'
import Logo from './Logo.jsx'
import Card from './Card.jsx'
import MobileMenu from './MobileMenu.jsx'
import UserProfile from './UserProfile.jsx'
import LoginButton from './LoginButton.jsx'

const HomePage = () => {
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
                content={{
                  items: [
                    {desc: 'Home', link: '#'},
                    {desc: 'Product', link: '#'},
                    {desc: 'Teams', link: '#'},
                    {desc: 'About', link: '#'},
                  ],
                  active: 0,
                }}
              />
            </div>

            <LoginButton loginStatus={loginStatus} setLoginStatus={setLoginStatus} />

            <MobileMenuButton menuStatus={menuStatus} setMenuStatus={setMenuStatus} />
          </div>
        </div>
        <MobileMenu
          content={{
            items: [
              {desc: 'Home', link: '#'},
              {desc: 'Product', link: '#'},
              {desc: 'Teams', link: '#'},
              {desc: 'About', link: '#'},
            ],
            active: 0,
          }}
          menuStatus={menuStatus}
        />
      </nav>

      <div className="block md:flex">
        {loginStatus ? <UserProfile /> : ''}

        <div className="block divide-y w-full px-2">
          <header className="">
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

export default HomePage
