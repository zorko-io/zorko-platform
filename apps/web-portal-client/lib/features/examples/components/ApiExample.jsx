import React, {useEffect, useState} from 'react'
import {createClient} from '@util-web-api-client'

const client = createClient()

export function ApiExample() {
  const [login, setLogin] = useState(null)
  const [previews, setPreviews] = useState([])

  useEffect(() => {
    client.auth.login().then((res) => {
      setLogin(res)
    })
    client.preview.findAll({offset: 0, limit: 10}).then((res) => {
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
