import {configureStore} from '@reduxjs/toolkit'
import {logger} from '../logger'
import authReducer from '../features/auth/slices'
import examplesReducer from '../features/examples/slices'

const loggerMiddleware = () => (next) => (action) => {
  logger.info(action)
  return next(action)
}

export default configureStore({
  reducer: {
    auth: authReducer,
    examples: examplesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
})
