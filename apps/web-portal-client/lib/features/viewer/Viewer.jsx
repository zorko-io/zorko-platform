import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Vega} from 'react-vega'

import {useFetchData} from '../../hooks'
import Spinner from '../../components/Spinner'

import './viewer.css'

export function Viewer({match}) {
  const [{data: vegaData, isLoading, isError}, doFetch] = useFetchData((params, api) =>
    api.spec.findById(params)
  )

  useEffect(() => {
    doFetch(match.params.id)
  }, [])

  return (
    <>
      <Spinner show={isLoading} />
      {isError && isError.message}
      {vegaData && (
        <div className="viewer" data-test-id="full-preview">
          <Vega spec={vegaData.data.spec} />
        </div>
      )}
    </>
  )
}

Viewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),

  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

Viewer.defaultProps = {
  match: {},
  history: {},
}
