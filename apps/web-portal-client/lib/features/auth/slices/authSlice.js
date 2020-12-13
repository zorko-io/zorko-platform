import {createSlice} from '@reduxjs/toolkit'
import authReducer, {initialState} from './authReducer'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: authReducer,
})

export const {logging, login, logout, error} = authSlice.actions

export default authSlice.reducer
