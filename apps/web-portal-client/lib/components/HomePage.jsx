import React from 'react'

import {UserProfile} from './UserProfile'
import {Card} from './Card'
import {Content, Sidebar, Layout} from './layout'

// TODO: load previews from the server. Use api.preview.findAll
// label: enhancement
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
