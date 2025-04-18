import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Department } from '../../types'
import { fetchDepartments } from '../../api/fakeApi'

export const loadDepartments = createAsyncThunk('departments/load', async () => {
  return await fetchDepartments()
})

interface DepartmentsState {
  items: Department[]
  loading: boolean
}

const initialState: DepartmentsState = {
  items: [],
  loading: false,
}

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    addDepartment(state, action: PayloadAction<Department>) {
      state.items.push(action.payload)
    },
    updateDepartment(state, action: PayloadAction<Department>) {
      const idx = state.items.findIndex(department => department.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    },
    deleteDepartment(state, action: PayloadAction<string>) {
      state.items = state.items.filter(department => department.id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadDepartments.pending, state => {
        state.loading = true
      })
      .addCase(loadDepartments.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(loadDepartments.rejected, state => {
        state.loading = false
      })
  },
})

export const { addDepartment, updateDepartment, deleteDepartment } = departmentsSlice.actions
export default departmentsSlice.reducer