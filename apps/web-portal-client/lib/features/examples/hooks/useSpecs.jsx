import {useContext} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Specs from '../slices/specsSlice'
import {AppContext} from '../../../context'
import {selectSpecs, selectSpecsError, selectLoadingSpecs} from '../selectors'

export function useSpecs() {
  const dispatch = useDispatch()
  const {api} = useContext(AppContext)

  return {
    fetch: () => {
      dispatch(Specs.loading())
      return api.spec
        .findAll()
        .then((result) => {
          dispatch(Specs.set(result.items))
        })
        .catch((err) => {
          dispatch(Specs.error(err))
        })
    },
    specs: useSelector(selectSpecs),
    isLoading: useSelector(selectLoadingSpecs),
    error: useSelector(selectSpecsError),
  }
}
