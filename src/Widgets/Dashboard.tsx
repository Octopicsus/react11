import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import {
  loadEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../Store/features/employeesSlice";
import {
  loadDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../Store/features/departmentsSlice";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";
import DepartmentTable from "./DepartmentTable";
import DepartmentForm from "./DepartmentForm";
import FilterBar from "./FilterBar";
import { Button, Row, Col, Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Employee, Department } from "../types";
import { useAppDispatch } from "../Store/hooks";

type EmployeeFormValues = {
  name: string;
  departmentId: string;
};

type DepartmentFormValues = {
  name: string;
};

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const employees = useSelector((s: RootState) => s.employees.items);
  const departments = useSelector((s: RootState) => s.departments.items);

  const [showEmpForm, setShowEmpForm] = useState(false);
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [showDepForm, setShowDepForm] = useState(false);
  const [editDep, setEditDep] = useState<Department | null>(null);
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  useEffect(() => {
    dispatch(loadEmployees());
    dispatch(loadDepartments());
  }, [dispatch]);

  const filteredEmployees = employees
    .filter(
      (e) =>
        (!filterName ||
          e.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (!filterDepartment || e.departmentId === filterDepartment)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleEmpSubmit = (data: EmployeeFormValues) => {
    if (editEmp) {
      dispatch(updateEmployee({ ...editEmp, ...data }));
    } else {
      dispatch(addEmployee({ id: uuidv4(), ...data }));
    }
    setShowEmpForm(false);
    setEditEmp(null);
  };
  const handleEmpEdit = (emp: Employee) => {
    setEditEmp(emp);
    setShowEmpForm(true);
  };
  const handleEmpDelete = (id: string) => dispatch(deleteEmployee(id));

  const handleDepSubmit = (data: DepartmentFormValues) => {
    if (editDep) {
      dispatch(updateDepartment({ ...editDep, ...data }));
    } else {
      dispatch(addDepartment({ id: uuidv4(), ...data }));
    }
    setShowDepForm(false);
    setEditDep(null);
  };
  const handleDepEdit = (dep: Department) => {
    setEditDep(dep);
    setShowDepForm(true);
  };
  const handleDepDelete = (id: string) => dispatch(deleteDepartment(id));

  return (
    <Row>
      <Col md={8}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Employees</Card.Title>
            <Button
              className="mb-3"
              onClick={() => {
                setEditEmp(null);
                setShowEmpForm(true);
              }}
            >
              Add employee
            </Button>
            <FilterBar
              filterName={filterName}
              setFilterName={setFilterName}
              filterDepartment={filterDepartment}
              setFilterDepartment={setFilterDepartment}
              departments={departments}
            />
            <EmployeeTable
              employees={filteredEmployees}
              departments={departments}
              onEdit={handleEmpEdit}
              onDelete={handleEmpDelete}
            />
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Departments</Card.Title>
            <Button
              className="mb-3"
              onClick={() => {
                setEditDep(null);
                setShowDepForm(true);
              }}
            >
              Add Department
            </Button>
            <DepartmentTable
              departments={departments}
              onEdit={handleDepEdit}
              onDelete={handleDepDelete}
            />
          </Card.Body>
        </Card>
      </Col>
      <EmployeeForm
        show={showEmpForm}
        onHide={() => setShowEmpForm(false)}
        onSubmit={handleEmpSubmit}
        departments={departments}
        defaultValues={
          editEmp
            ? { name: editEmp.name, departmentId: editEmp.departmentId }
            : undefined
        }
      />
      <DepartmentForm
        show={showDepForm}
        onHide={() => setShowDepForm(false)}
        onSubmit={handleDepSubmit}
        defaultValues={editDep ? { name: editDep.name } : undefined}
      />
    </Row>
  );
}
