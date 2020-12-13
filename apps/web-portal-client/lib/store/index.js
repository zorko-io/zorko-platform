import {configureStore} from '@reduxjs/toolkit'
import authReducer from '@web-portal-client/features/auth/slices'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})
