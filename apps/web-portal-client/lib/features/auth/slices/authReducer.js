export const initialState = {
  user: {
    email: null,
    token: null,
    id: null,
    name: null,
  },
  logging: false,
  logged: false,
  error: null,
}

const authReducer = {
  logging: (state) => {
    state.logging = true
  },
  login: (state, action) => {
    state.user = {...action.payload}
    state.logging = false
    state.logged = true
  },
  logout: (state) => {
    state = initialState
  },
  error: (state, action) => {
    state.logging = false
    state.error = action.payload
  },
}

export default authReducer
