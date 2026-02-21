import { validationResult } from 'express-validator'
import Note from '../models/Note.js'

export const createNote = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const note = await Note.create({
    user: req.user._id,
    title: req.body.title,
    content: req.body.content,
  })

  res.status(201).json(note)
}

export const getNotes = async (req, res) => {
  const search = (req.query.q || '').trim()

  const filter = { user: req.user._id }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ]
  }

  const notes = await Note.find(filter).sort({ updatedAt: -1 })
  res.json(notes)
}

export const updateNote = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }

  note.title = req.body.title
  note.content = req.body.content

  const updated = await note.save()
  res.json(updated)
}

export const deleteNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }

  await note.deleteOne()
  res.json({ message: 'Note deleted' })
}
