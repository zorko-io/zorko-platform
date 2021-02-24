import {useEffect, useContext, useReducer} from 'react'
import {AppContext} from '../../../context'

export const usePreviews = () => {
  const fetchPreviewsReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT': {
        return {...state, isLoading: true, isError: false}
      }
      case 'FETCH_SUCCESS': {
        return {...state, isLoading: false, previews: action.payload}
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

  const {api} = useContext(AppContext)

  useEffect(() => {
    let didCancel = false

    if (!didCancel) {
      dispatch({type: 'FETCH_INIT'})

      api.preview
        .findAll()
        .then((result) => {
          setTimeout(() => {
            dispatch({type: 'FETCH_SUCCESS', payload: result})
          }, 2000)
        })
        .catch(() => dispatch({type: 'FETCH_FAILURE'}))
    }

    return () => {
      didCancel = true
    }
  }, [])

  return state
}
