import React from 'react'

import Spinner from './Spinner'

import {UserProfile} from './UserProfile'
import {Card} from './Card'
import {Content, Sidebar, Layout} from './layout'

import {usePreviews} from '../features/home/hooks'

// TODO: load previews from the server. Use api.preview.findAll
// label: enhancement
export function HomePage() {
  const {previews, isLoading, isError} = usePreviews()

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
              <Spinner show={isLoading} />
              {isError && <div>{isError}</div>}
              {previews && previews.items.map((item) => <Card key={item.id} item={item} />)}
            </>
          )}
        />
      )}
    />
  )
}
