import { Employee, Department } from '../types'

const departments: Department[] = [
  { id: '1', name: 'HR' },
  { id: '2', name: 'IT' },
  { id: '3', name: 'Finance' },
]

const employees: Employee[] = [
  { id: '1', name: 'Alice', departmentId: '1' },
  { id: '2', name: 'Bob', departmentId: '2' },
  { id: '3', name: 'Charlie', departmentId: '3' },
]

export const fetchDepartments = () =>
  new Promise<Department[]>(resolve => setTimeout(() => resolve(departments), 500))

export const fetchEmployees = () =>
  new Promise<Employee[]>(resolve => setTimeout(() => resolve(employees), 500))