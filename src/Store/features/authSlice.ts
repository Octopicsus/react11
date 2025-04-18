import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuth: boolean
}

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('isAuth'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      if (
        action.payload.username === 'admin' &&
        action.payload.password === 'admin'
      ) {
        state.isAuth = true
        localStorage.setItem('isAuth', 'true')
      }
    },
    logout(state) {
      state.isAuth = false
      localStorage.removeItem('isAuth')
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer