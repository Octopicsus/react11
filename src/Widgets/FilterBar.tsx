import { Form, Row, Col } from 'react-bootstrap'
import { Department } from '../types'

interface Props {
  filterName: string
  setFilterName: (v: string) => void
  filterDepartment: string
  setFilterDepartment: (v: string) => void
  departments: Department[]
}

export default function FilterBar({
  filterName,
  setFilterName,
  filterDepartment,
  setFilterDepartment,
  departments,
}: Props) {
  return (
    <Form className="mb-3">
      <Row>
        <Col md={6}>
          <Form.Control
            placeholder="Name filter"
            value={filterName}
            onChange={event => setFilterName(event.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={filterDepartment}
            onChange={event => setFilterDepartment(event.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.name}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Form>
  )
}