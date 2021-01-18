import React from 'react'

import {UserProfile} from './UserProfile'
import {Card} from './Card'
import {Content, Sidebar, Layout} from './layout'

export function HomePage() {
  return (
    <Layout
      sidebarRender={() => (
        <Sidebar>
          <UserProfile />
        </Sidebar>
      )}
      contentRender={() => (
        <Content
          title="Visualization"
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
