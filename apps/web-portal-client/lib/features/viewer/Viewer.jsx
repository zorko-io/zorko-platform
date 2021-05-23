import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Vega} from 'react-vega'

import {useFetchData} from '../../hooks'
import Spinner from '../../components/Spinner'
import {Tab, TabItem} from '../../components/tab'
import {ImageShapes} from '../../components/Image'

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
          <Tab>
            <TabItem name="Chart" id="chart">
              <Vega spec={vegaData.data.spec} />
            </TabItem>
            <TabItem name="Second" id="second">
              Content for second Tab
            </TabItem>
            <TabItem name="Download" id="download" icon={ImageShapes.save}>
              Download
            </TabItem>
          </Tab>
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
