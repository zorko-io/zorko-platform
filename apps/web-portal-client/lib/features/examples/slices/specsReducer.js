export const initialState = {
  list: [],
  loading: false,
  error: null,
}

const specsReducer = {
  loading: (state) => {
    return {...state, loading: true}
  },
  set: (state, action) => {
    return {...initialState, list: [...action.payload], loading: false}
  },
  error: (state, action) => {
    return {...state, loading: false, error: action.payload}
  },
}

export default specsReducer
