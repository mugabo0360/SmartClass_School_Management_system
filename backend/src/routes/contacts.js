import { Router } from 'express'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { db } from '../utils/store.js'

const router = Router()
const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional(),
  tags: z.array(z.string()).default([])
})

router.get('/', (req, res) => {
  const items = db.contacts.filter((c) => c.schoolId === req.user.schoolId)
  res.json(items)
})

router.post('/', (req, res) => {
  const payload = contactSchema.parse(req.body)
  const item = { id: randomUUID(), schoolId: req.user.schoolId, ...payload, createdAt: new Date().toISOString() }
  db.contacts.push(item)
  db.analytics.totalContacts += 1
  res.status(201).json(item)
})

export default router
