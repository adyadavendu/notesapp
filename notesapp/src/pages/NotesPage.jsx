import { useEffect, useMemo, useState } from 'react'
import api from '../api/client'
import Navbar from '../components/Navbar'
import NoteEditor from '../components/NoteEditor'
import NoteList from '../components/NoteList'
import { useAuth } from '../context/AuthContext'

const initialForm = { title: '', content: '' }

const NotesPage = () => {
  const { user, logout, deleteAccount } = useAuth()
  const [notes, setNotes] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')

  const loadNotes = async (query = '') => {
    try {
      setLoading(true)
      const response = await api.get('/notes', {
        params: query ? { q: query } : {},
      })
      setNotes(response.data)
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      if (editingId) {
        await api.put(`/notes/${editingId}`, form)
      } else {
        await api.post('/notes', form)
      }

      setForm(initialForm)
      setEditingId(null)
      await loadNotes(searchText)
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Failed to save note')
    }
  }

  const onEdit = (note) => {
    setEditingId(note._id)
    setForm({ title: note.title, content: note.content })
  }

  const onDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`)
      await loadNotes(searchText)
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Failed to delete note')
    }
  }

  const onSearch = async (event) => {
    event.preventDefault()
    await loadNotes(searchText)
  }

  const onCancelEdit = () => {
    setEditingId(null)
    setForm(initialForm)
  }

  const onLogout = async () => {
    await logout()
  }

  const onDeleteAccount = async () => {
    const confirmed = window.confirm(
      'This will permanently delete your account and all notes. Continue?',
    )

    if (!confirmed) {
      return
    }

    const phrase = window.prompt('Type DELETE to permanently remove your account:')
    if (phrase !== 'DELETE') {
      setError('Account deletion canceled: type DELETE exactly to confirm.')
      return
    }

    try {
      await deleteAccount()
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Failed to delete account')
    }
  }

  const title = useMemo(() => (editingId ? 'Update your note' : 'Write a note'), [editingId])

  return (
    <div className="app-shell">
      <Navbar
        user={user}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((value) => !value)}
        onLogout={onLogout}
        onDeleteAccount={onDeleteAccount}
      />

      <main className="content">
        <section>
          <h2 className="section-title">{title}</h2>
          <NoteEditor
            form={form}
            setForm={setForm}
            onSubmit={onSubmit}
            isEditing={Boolean(editingId)}
            onCancel={onCancelEdit}
          />
        </section>

        <section>
          <form className="search-bar" onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Search notes"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button className="secondary-btn">Search</button>
          </form>

          {error && <p className="error-text">{error}</p>}
          {loading ? <div className="card">Loading...</div> : <NoteList notes={notes} onEdit={onEdit} onDelete={onDelete} />}
        </section>
      </main>
    </div>
  )
}

export default NotesPage
