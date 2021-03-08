import {combineReducers} from '@reduxjs/toolkit'
import specsReducer from './specsSlice'

export default combineReducers({
  specs: specsReducer,
})
