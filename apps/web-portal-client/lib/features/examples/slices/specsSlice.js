import {createSlice} from '@reduxjs/toolkit'
import specReducer, {initialState} from './specsReducer'

export const specsSlice = createSlice({
  name: 'specs',
  initialState,
  reducers: specReducer,
})

export const {loading, set, error} = specsSlice.actions

export default specsSlice.reducer
