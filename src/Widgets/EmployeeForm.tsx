import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Modal } from "react-bootstrap";
import { Department } from "../types";

const schema = yup.object({
  name: yup.string().required("Имя обязательно"),
  departmentId: yup.string().required("Департамент обязателен"),
});

type EmployeeFormValues = {
  name: string;
  departmentId: string;
};

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: EmployeeFormValues) => void;
  departments: Department[];
  defaultValues?: Partial<EmployeeFormValues>;
}

export default function EmployeeForm({
  show,
  onHide,
  onSubmit,
  departments,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleClose = () => {
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {defaultValues?.name ? "Edit" : "Add"} Employee
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control {...register("name")} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              {...register("departmentId")}
              isInvalid={!!errors.departmentId}
            >
              <option value="">Select department</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.departmentId?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
