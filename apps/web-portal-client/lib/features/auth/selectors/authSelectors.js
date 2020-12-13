export const selectLoginState = (state) => state.auth.logging
export const selectLoginStatus = (state) => state.auth.logged
export const selectAuthToken = (state) => state.auth.user.token
