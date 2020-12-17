export const initialState = {
  user: {
    email: null,
    token: null,
    id: null,
    name: null,
  },
  logging: false,
  error: null,
}

const authReducer = {
  logging: (state) => {
    return {...state, logging: true}
  },
  login: (state, action) => {
    return {...state, user: {...action.payload}, logging: false}
  },
  logout: () => {
    return initialState
  },
  error: (state, action) => {
    return {...state, logging: false, error: action.payload}
  },
}

export default authReducer
