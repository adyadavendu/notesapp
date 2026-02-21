import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
  },
  { timestamps: true },
)

noteSchema.index({ user: 1, title: 'text', content: 'text' })

const Note = mongoose.model('Note', noteSchema)

export default Note
