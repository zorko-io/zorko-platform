import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Vega} from 'react-vega'

import {useFetchData} from '../../hooks'

import Spinner from '../../components/Spinner'
import {Button} from '../../components/Button'

export function Viewer({match, history}) {
  const [{data: vegaData, isLoading, isError}, doFetch] = useFetchData((params, api) =>
    api.spec.findById(params)
  )

  useEffect(() => {
    doFetch(match.params.id)
  }, [match.params.id])

  return (
    <>
      <Spinner show={isLoading} />
      {isError && isError.message}
      {vegaData && <Vega spec={vegaData.data.spec} />}
      <Button onClick={() => history.goBack()}>Go Back</Button>
    </>
  )
}

Viewer.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
}
