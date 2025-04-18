import { Table, Button } from "react-bootstrap";
import { Employee, Department } from "../types";

interface Props {
  employees: Employee[];
  departments: Department[];
  onEdit: (emp: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeTable({
  employees,
  departments,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>
              {departments.find((d) => d.id === emp.departmentId)?.name || ""}
            </td>
            <td>
              <Button
                size="sm"
                variant="warning"
                onClick={() => onEdit(emp)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(emp.id)}
              >
                Del
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
