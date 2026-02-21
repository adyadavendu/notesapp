import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../api/client'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/api/auth/me')
      setUser(response.data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const signup = async (payload) => {
    const response = await api.post('/api/auth/signup', payload)
    setUser(response.data.user)
    return response.data.user
  }

  const login = async (payload) => {
    const response = await api.post('/api/auth/login', payload)
    setUser(response.data.user)
    return response.data.user
  }

  const logout = async () => {
    await api.post('/api/auth/logout')
    setUser(null)
  }

  const deleteAccount = async () => {
    await api.delete('/api/auth/account')
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      signup,
      login,
      logout,
      deleteAccount,
      refreshUser: fetchCurrentUser,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}