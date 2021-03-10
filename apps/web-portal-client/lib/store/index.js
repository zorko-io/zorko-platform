import {configureStore} from '@reduxjs/toolkit'
import {logger} from '../logger'
import authReducer from '../features/auth/slices'

const loggerMiddleware = () => (next) => (action) => {
  logger.info(action)
  return next(action)
}

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
})
