import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Employee } from '../../types'
import { fetchEmployees } from '../../api/fakeApi'

export const loadEmployees = createAsyncThunk('employees/load', async () => {
  return await fetchEmployees()
})

interface EmployeesState {
  items: Employee[]
  loading: boolean
}

const initialState: EmployeesState = {
  items: [],
  loading: false,
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<Employee>) {
      state.items.push(action.payload)
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const idx = state.items.findIndex(event => event.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    },
    deleteEmployee(state, action: PayloadAction<string>) {
      state.items = state.items.filter(event => event.id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadEmployees.pending, state => {
        state.loading = true
      })
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(loadEmployees.rejected, state => {
        state.loading = false
      })
  },
})

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions
export default employeesSlice.reducer