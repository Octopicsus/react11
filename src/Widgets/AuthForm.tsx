import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { login } from '../Store/features/authSlice'

const schema = yup.object({
  username: yup.string().required('Invalid login'),
  password: yup.string().required('Invalid password'),
})

export default function AuthForm() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    dispatch(login(data))
  }

  return (
    <div className="d-flex justify-content-center align-items-start" style={{ minHeight: '100vh', paddingTop: 200, width: '100vw' }}>
      <Card style={{ maxWidth: 400, width: '100%' }}>
        <Card.Body>
          <Card.Title>Dashboard App</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Login</Form.Label>
              <Form.Control {...register('username')} isInvalid={!!errors.username} />
              <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Enter</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}