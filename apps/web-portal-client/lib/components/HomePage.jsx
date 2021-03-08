import React, {useContext} from 'react'
import {useFetchData} from '../hook'
import {AppContext} from '../context'

import Spinner from './Spinner'

import {UserProfile} from './UserProfile'
import {PreviewCard} from './PreviewCard'
import {Content, Sidebar, Layout} from './layout'

export function HomePage() {
  const {api} = useContext(AppContext)

  const {data: previews, isLoading, isError} = useFetchData(api.preview.findAll)
  //console.log('previews: ' + previews, 'error: ' + isError, 'loading: ' + isLoading)

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
              {isError && <div>ERROR: {isError.message}</div>}
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
