import {useEffect, useReducer} from 'react'

export function useFetchData(request) {
  const fetchPreviewsReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT': {
        return {...state, isLoading: true, isError: false}
      }
      case 'FETCH_SUCCESS': {
        return {...state, isLoading: false, isError: false, data: action.payload}
      }
      case 'FETCH_FAILURE': {
        return {...state, isLoading: false, isError: action.payload}
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
      request
        .then((result) => {
          if (!didCancel) dispatch({type: 'FETCH_SUCCESS', payload: result})
        })
        .catch((error) => {
          if (!didCancel) dispatch({type: 'FETCH_FAILURE', payload: error})
        })
    }

    return () => {
      didCancel = true
    }
  }, [])

  return state
}
