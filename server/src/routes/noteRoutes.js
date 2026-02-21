import express from 'express'
import { body, param } from 'express-validator'
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from '../controllers/noteController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.get('/', getNotes)

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
  ],
  createNote,
)

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid note id'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
  ],
  updateNote,
)

router.delete('/:id', [param('id').isMongoId().withMessage('Invalid note id')], deleteNote)

export default router
