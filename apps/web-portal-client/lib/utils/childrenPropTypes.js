import PropTypes from 'prop-types'

export const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.func,
])
