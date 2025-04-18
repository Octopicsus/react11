import { Provider, useSelector } from 'react-redux'
import { store, RootState } from './Store/store'
import AuthForm from './Widgets/AuthForm'
import Dashboard from './Widgets/Dashboard'
import Layout from './Widgets/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'

function AppContent() {
  const isAuth = useSelector((s: RootState) => s.auth.isAuth)
  return isAuth ? (
    <Layout>
      <Dashboard />
    </Layout>
  ) : (
    <AuthForm />
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}