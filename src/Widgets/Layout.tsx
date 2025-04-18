import { Container, Navbar, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from '../Store/features/authSlice'

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Button variant="outline-light" onClick={() => dispatch(logout())}>Exit</Button>
        </Container>
      </Navbar>
      <div className="d-flex flex-column align-items-center" style={{ minHeight: '100vh', paddingTop: '32px',  width: '100vw'  }}>
        <Container>{children}</Container>
      </div>
    </>
  )
}