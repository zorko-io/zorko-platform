import {useEffect, useState, useContext, useReducer} from 'react'
import {AppContext} from '../../../context'

export const usePreviews = () => {
  const [previews, setPreviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const {api} = useContext(AppContext)

  useEffect(() => {
    const didCancel = false

    if (!didCancel) {
      setIsLoading(true)
      setIsError(false)

      api.preview
        .findAll()
        .then((result) => {
          setPreviews(result)
          setIsLoading(false)
        })
        .catch((error) => setIsError(error))
    }

    return () => (didCancel = true)
  }, [])

  return {previews, isLoading, isError}
}
