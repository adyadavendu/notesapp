import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    return <Navigate to="/" replace />
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthForm
      mode="login"
      form={form}
      setForm={setForm}
      onSubmit={onSubmit}
      error={error}
      loading={loading}
    />
  )
}

export default LoginPage
