import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button, Modal } from 'react-bootstrap'


const schema = yup.object({
  name: yup.string().required('Название обязательно'),
})

type DepartmentFormValues = {
  name: string
}

interface Props {
  show: boolean
  onHide: () => void
  onSubmit: (data: DepartmentFormValues) => void
  defaultValues?: Partial<DepartmentFormValues>
}

export default function DepartmentForm({ show, onHide, onSubmit, defaultValues }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DepartmentFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const handleClose = () => {
    reset()
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{defaultValues?.name ? 'Редактировать' : 'Добавить'} departments</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control {...register('name')} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}