const NoteEditor = ({ form, setForm, onSubmit, isEditing, onCancel }) => {
  return (
    <form className="card note-editor" onSubmit={onSubmit}>
      <h2>{isEditing ? 'Edit Note' : 'New Note'}</h2>

      <label>
        Title
        <input
          type="text"
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          required
        />
      </label>

      <label>
        Content
        <textarea
          rows="8"
          value={form.content}
          onChange={(event) => setForm({ ...form, content: event.target.value })}
          required
        />
      </label>

      <div className="note-editor-actions">
        <button className="primary-btn">{isEditing ? 'Update' : 'Create'}</button>
        {isEditing && (
          <button className="secondary-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default NoteEditor
