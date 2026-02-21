import { useEffect, useRef, useState } from 'react'

const Navbar = ({ user, darkMode, onToggleDarkMode, onLogout, onDeleteAccount }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [])

  return (
    <header className="navbar">
      <h1 className="brand">Notes</h1>
      <div className="nav-actions">
        <span className="user-name">{user?.name}</span>
        <div className="settings-menu" ref={menuRef}>
          <button
            className="icon-btn"
            aria-label="Open settings"
            onClick={() => setOpen((value) => !value)}
          >
            ⚙
          </button>

          {open && (
            <div className="settings-dropdown">
              <button
                className="menu-item"
                onClick={() => {
                  onToggleDarkMode()
                  setOpen(false)
                }}
              >
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <button
                className="menu-item"
                onClick={async () => {
                  setOpen(false)
                  await onLogout()
                }}
              >
                Logout
              </button>
              <button
                className="menu-item danger-item"
                onClick={async () => {
                  setOpen(false)
                  await onDeleteAccount()
                }}
              >
                Delete account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
