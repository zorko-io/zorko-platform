import {useEffect, useReducer} from 'react'

export function useFetchData(callback) {
  const fetchPreviewsReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT': {
        return {...state, isLoading: true, isError: false}
      }
      case 'FETCH_SUCCESS': {
        return {...state, isLoading: false, data: action.payload}
      }
      case 'FETCH_FAILURE': {
        return {...state, isLoading: false, isError: true}
      }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchPreviewsReducer, {
    previews: undefined,
    isLoading: false,
    isError: false,
  })

  useEffect(() => {
    let didCancel = false

    dispatch({type: 'FETCH_INIT'})

    if (!didCancel) {
      callback()
        .then((result) => {
          if (!didCancel) dispatch({type: 'FETCH_SUCCESS', payload: result})
        })
        .catch(() => {
          if (!didCancel) dispatch({type: 'FETCH_FAILURE'})
        })
    }

    return () => (didCancel = true)
  }, [])

  return {data: state.data, isLoading, isError}
}
