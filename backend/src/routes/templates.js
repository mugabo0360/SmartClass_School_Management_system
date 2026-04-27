import { Router } from 'express'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { db } from '../utils/store.js'

const router = Router()
const templateSchema = z.object({
  name: z.string().min(2),
  content: z.string().min(3),
  category: z.string().default('general')
})

router.get('/', (req, res) => {
  const items = db.templates.filter((t) => t.schoolId === req.user.schoolId)
  res.json(items)
})

router.post('/', (req, res) => {
  const payload = templateSchema.parse(req.body)
  const item = { id: randomUUID(), schoolId: req.user.schoolId, ...payload, createdAt: new Date().toISOString() }
  db.templates.push(item)
  res.status(201).json(item)
})

export default router
