const NoteList = ({ notes, onEdit, onDelete }) => {
  if (!notes.length) {
    return <div className="card empty-state">No notes found.</div>
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <article key={note._id} className="card note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>
            Updated {new Date(note.updatedAt).toLocaleString()}
          </small>
          <div className="note-actions">
            <button className="secondary-btn" onClick={() => onEdit(note)}>
              Edit
            </button>
            <button className="danger-btn" onClick={() => onDelete(note._id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default NoteList
