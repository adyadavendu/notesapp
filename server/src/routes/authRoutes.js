import express from 'express'
import { body } from 'express-validator'
import {
  deleteAccount,
  getMe,
  login,
  logout,
  signup,
} from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post(
  '/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  signup,
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login,
)

router.post('/logout', logout)
router.get('/me', protect, getMe)
router.delete('/account', protect, deleteAccount)

export default router
