import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { config } from '../config/index.js'
import { db } from '../utils/store.js'
import { randomUUID } from 'crypto'

const router = Router()

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'teacher', 'staff']).default('admin'),
  schoolName: z.string().min(2),
  district: z.string().min(2)
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

router.post('/register', async (req, res) => {
  const payload = registerSchema.parse(req.body)
  const email = payload.email.toLowerCase()
  const exists = db.users.some((u) => u.email === email)
  if (exists) return res.status(409).json({ error: 'Email already exists' })

  const schoolId = randomUUID()
  const userId = randomUUID()
  db.schools.push({ id: schoolId, name: payload.schoolName, district: payload.district, createdAt: new Date().toISOString() })
  db.users.push({
    id: userId,
    fullName: payload.fullName,
    email,
    passwordHash: await bcrypt.hash(payload.password, 10),
    role: payload.role,
    schoolId,
    createdAt: new Date().toISOString()
  })

  const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' })
  res.status(201).json({ token, user: { id: userId, fullName: payload.fullName, email, role: payload.role, schoolId } })
})

router.post('/login', async (req, res) => {
  const payload = loginSchema.parse(req.body)
  const email = payload.email.toLowerCase()
  const user = db.users.find((u) => u.email === email)
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const ok = await bcrypt.compare(payload.password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '7d' })
  res.json({
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId
    }
  })
})

export default router
