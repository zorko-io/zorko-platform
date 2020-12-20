import React from 'react'

import {UserProfile} from './UserProfile'
import {Card} from './Card'
import {Content, Header, Sidebar, Navbar, Layout} from './layout'

export function HomePage() {
  return (
    <Layout
      navbarRender={() => <Navbar />}
      sidebarRender={() => (
        <Sidebar>
          <UserProfile />
        </Sidebar>
      )}
      headerRender={() => <Header title="Visualization" />}
      contentRender={() => (
        <Content
          innerContentRender={() => (
            <>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </>
          )}
        />
      )}
    />
  )
}
