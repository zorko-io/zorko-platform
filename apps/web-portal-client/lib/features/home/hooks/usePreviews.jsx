import {useState, useContext, useEffect} from 'react'
import {AppContext} from '../../../context'

export function usePreviews() {
  const [previews, setPreviews] = useState([])
  const {api} = useContext(AppContext)

  useEffect(() => {
    api.preview.findAll().then((result) => {
      setPreviews(result)
      console.log(previews)
    })
  }, [])

  return previews
}
