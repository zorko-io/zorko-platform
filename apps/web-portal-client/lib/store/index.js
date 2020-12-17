import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/slices'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})
