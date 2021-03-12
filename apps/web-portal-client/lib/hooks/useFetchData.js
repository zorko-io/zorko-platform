import {useEffect, useReducer, useRef} from 'react'

export function useFetchData(callback) {
  const fetchDataReducer = (state, action) => {
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

  const [state, dispatch] = useReducer(fetchDataReducer, {
    data: undefined,
    isLoading: false,
    isError: false,
  })

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  }, [])

  function doFetch() {
    dispatch({type: 'FETCH_INIT'})

    callback()
      .then((result) => {
        if (isMounted.current) dispatch({type: 'FETCH_SUCCESS', payload: result})
      })
      .catch((error) => {
        if (isMounted.current) dispatch({type: 'FETCH_FAILURE', payload: error})
      })
  }

  return [state, doFetch]
}
