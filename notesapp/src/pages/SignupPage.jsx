import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../context/AuthContext'

const SignupPage = () => {
  const { user, signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
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
      await signup(form)
      navigate('/', { replace: true })
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthForm
      mode="signup"
      form={form}
      setForm={setForm}
      onSubmit={onSubmit}
      error={error}
      loading={loading}
    />
  )
}

export default SignupPage
