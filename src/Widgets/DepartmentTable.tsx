import { Table, Button } from 'react-bootstrap'
import { Department } from '../types'

interface Props {
  departments: Department[]
  onEdit: (dep: Department) => void
  onDelete: (id: string) => void
}

export default function DepartmentTable({ departments, onEdit, onDelete }: Props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {departments.map(dep => (
          <tr key={dep.id}>
            <td>{dep.name}</td>
            <td>
              <Button size="sm" variant="warning" onClick={() => onEdit(dep)} className="me-2">Edit</Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(dep.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}