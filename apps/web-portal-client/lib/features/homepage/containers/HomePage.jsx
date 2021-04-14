import React, {useCallback, useContext, useEffect} from 'react'
import {useFetchData} from '../../../hooks'


import Spinner from '../../../components/Spinner'

import {UserProfile} from '../../../components/UserProfile'
import {PreviewCard} from '../../../components/PreviewCard'
import {Content, Sidebar, Layout} from '../../../components/layout'

const createFetchHook = (callback) => {
  const func = useCallback(callback)
  return useFetchData(func)
}

const useFetchDataNew = createFetchHook((params, api) => api.previews.findAll(params))

export function HomePage() {
  const [{data: previews, isLoading, isError}, doFetch] = useFetchDataNew()

  useEffect(() => {
    doFetch()
  }, [])

  return (
    <Layout
      sidebarRender={() => (
        <Sidebar>
          <UserProfile />
        </Sidebar>
      )}
      contentRender={() => (
        <Content
          title="Previews"
          innerContentRender={() => (
            <>
              <Spinner show={isLoading} />
              {isError && isError.message}
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
