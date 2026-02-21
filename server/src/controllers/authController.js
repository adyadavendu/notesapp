import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import Note from '../models/Note.js'
import { clearAuthCookie, generateToken, setAuthCookie } from '../utils/token.js'

export const signup = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  const token = generateToken(user._id)
  setAuthCookie(res, token)

  return res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  })
}

export const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken(user._id)
  setAuthCookie(res, token)

  return res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  })
}

export const logout = (req, res) => {
  clearAuthCookie(res)
  res.json({ message: 'Logged out successfully' })
}

export const getMe = async (req, res) => {
  res.json({ user: req.user })
}

export const deleteAccount = async (req, res) => {
  await Note.deleteMany({ user: req.user._id })
  await User.findByIdAndDelete(req.user._id)

  clearAuthCookie(res)
  res.json({ message: 'Account deleted successfully' })
}
