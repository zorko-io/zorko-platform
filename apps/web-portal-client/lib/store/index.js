import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/slices/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})
