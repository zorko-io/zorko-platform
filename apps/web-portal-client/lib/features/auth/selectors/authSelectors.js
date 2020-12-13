export const selectLoginState = (state) => state.auth.logging
export const selectAuthToken = (state) => state.auth.user.token
export const selectAuthError = (state) => state.auth.error
