import React, {useEffect, useState, useContext} from 'react'
import {AppContext} from '../../../context'

export function ApiExample() {
  const [previews, setPreviews] = useState([])
  const {api} = useContext(AppContext)

  useEffect(() => {
    api.preview.findAll({offset: 0, limit: 10}).then((res) => {
      setPreviews(res.items)
    })
  }, [])

  return (
    <>
      <div>Api Example Component</div>
      <hr />
      <div>
        {previews.map((preview) => (
          <div key={preview.id}>{JSON.stringify(preview)}</div>
        ))}
      </div>
    </>
  )
}
