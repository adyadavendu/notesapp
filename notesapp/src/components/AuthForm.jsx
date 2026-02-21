import { Link } from 'react-router-dom'

const AuthForm = ({ mode, form, setForm, onSubmit, error, loading }) => {
  const isLogin = mode === 'login'

  return (
    <div className="auth-wrapper">
      <form className="card" onSubmit={onSubmit}>
        <h2>{isLogin ? 'Login' : 'Create account'}</h2>

        {!isLogin && (
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            minLength={6}
            required
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button className="primary-btn" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign up'}
        </button>

        <p className="muted-text">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link to={isLogin ? '/signup' : '/login'}>{isLogin ? 'Sign up' : 'Login'}</Link>
        </p>
      </form>
    </div>
  )
}

export default AuthForm
