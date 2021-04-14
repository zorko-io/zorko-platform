import React, {useEffect, useCallback} from 'react'
import {useFetchData} from '../../../hooks'

import Spinner from '../../../components/Spinner'
import {UserProfile} from '../../../components/UserProfile'
import {PreviewCard} from '../../../components/PreviewCard'
import {Content, Sidebar, Layout} from '../../../components/layout'

export function HomePage() {
  /*   const createFetchHook = (callback) => {
    const func = useCallback(callback)
    return useFetchData(func)
  } */

  //const useFetchPreviews = () => createFetchHook((params, api) => api.previews.findAll(params))

  //const useFetchPreviews = () => useFetchData((params, api) => api.previews.findAll(params))

  const [{data: previews, isLoading, isError}, doFetch] = useFetchData((params, api) =>
    api.previews.findAll(params)
  )

  useEffect(() => {
    doFetch({offset: 0, limit: 10})
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
