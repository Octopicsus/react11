import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import employeesReducer from './features/employeesSlice'
import departmentsReducer from './features/departmentsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    departments: departmentsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch