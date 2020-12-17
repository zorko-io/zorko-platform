import React from 'react'

import {UserProfile} from './UserProfile'
import {Header} from './Header'
import {Content} from './Content'
import {NavBar} from './nav-bar'
import {Sidebar} from './Sidebar'

export function HomePage() {
  return (
    <div>
      {/* <NavBar /> */}

      <div className="max-w-7xl mx-auto md:flex">
        {/*  <UserProfile /> */}
        {/*   <Sidebar>
          
        </Sidebar> */}

        <div className="block divide-y w-full px-2">
          {/*   <Header /> */}
          <Content />
        </div>
      </div>
    </div>
  )
}
