import {useContext, useReducer} from 'react'
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

  // TODO: extract as reusable reducer for HTTP calls
  // label: tech-debt
  const [state, dispatch] = useReducer(fetchPreviewsReducer, {
    previews: undefined,
    isLoading: false,
    isError: false,
  })

  const {api} = useContext(AppContext)

  // TODO: extract as reusable doFetch function for HTTP calls
  // label: tech-debt
  const doFetchPreviews = () => {
    dispatch({type: 'FETCH_INIT'})

    api.preview
      .findAll()
      .then((result) => {
        dispatch({type: 'FETCH_SUCCESS', payload: result})
      })
      .catch(() => dispatch({type: 'FETCH_FAILURE'}))
  }

  return [
    {previews: state.previews},
    {isLoading: state.isLoading, isError: state.isError, doFetchPreviews},
  ]
}
