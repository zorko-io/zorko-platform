/* import {useCallback} from 'react'
import {useFetchData} from '../../../hooks'

 const createFetchHook = (callback) => {
  const func = useCallback(callback)
  return useFetchData(func)
}


export const useFetchPreviews = createFetchHook((params, api) => api.previews.findAll(params)) */