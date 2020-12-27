import React, {useEffect, useState, useContext} from 'react'
import {AppContext} from '../../../context'

export function ApiExample() {
  const [login, setLogin] = useState(null)
  const [previews, setPreviews] = useState([])
  const {api} = useContext(AppContext)

  useEffect(() => {
    api.auth.login().then((res) => {
      setLogin(res)
    })
    api.preview.findAll({offset: 0, limit: 10}).then((res) => {
      setPreviews(res.items)
    })
  }, [])

  return (
    <>
      <div>Api Example Component</div>
      <hr />
      <div>Login</div>
      <div>{login ? JSON.stringify(login) : null}</div>
      <div>
        {previews.map((preview) => (
          <div key={preview.id}>{JSON.stringify(preview)}</div>
        ))}
      </div>
    </>
  )
}
