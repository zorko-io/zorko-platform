import React, {useEffect} from 'react'
import Spinner from './Spinner'
import {UserProfile} from './UserProfile'
import {PreviewCard} from './PreviewCard'
import {Content, Sidebar, Layout} from './layout'
import {usePreviews} from '../features/home/hooks'

export function HomePage() {
  const [{previews}, {isLoading, isError, doFetch}] = usePreviews()

  useEffect(() => doFetch(), [])

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
              {isError && <div>Something went wrong...</div>}
              {previews &&
                previews.items.map((item) => (
                  <PreviewCard
                    key={item.id}
                    title={item.title}
                    author={item.author}
                    cteatedAt={item.cteatedAt}
                  />
                ))}
            </>
          )}
        />
      )}
    />
  )
}
