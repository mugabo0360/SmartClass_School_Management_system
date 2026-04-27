import { Router } from 'express'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { db } from '../utils/store.js'

const router = Router()
const campaignSchema = z.object({
  name: z.string().min(3),
  message: z.string().min(3),
  audienceTag: z.string().optional()
})

router.get('/', (req, res) => {
  const items = db.campaigns.filter((c) => c.schoolId === req.user.schoolId)
  res.json(items)
})

router.post('/', (req, res) => {
  const payload = campaignSchema.parse(req.body)
  const item = {
    id: randomUUID(),
    schoolId: req.user.schoolId,
    status: 'draft',
    sentCount: 0,
    ...payload,
    createdAt: new Date().toISOString()
  }
  db.campaigns.push(item)
  db.analytics.totalCampaigns += 1
  res.status(201).json(item)
})

router.post('/:id/send', (req, res) => {
  const campaign = db.campaigns.find((c) => c.id === req.params.id && c.schoolId === req.user.schoolId)
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' })

  const recipients = db.contacts.filter((c) => c.schoolId === req.user.schoolId)
  campaign.status = 'sent'
  campaign.sentCount = recipients.length
  campaign.sentAt = new Date().toISOString()
  db.analytics.totalMessagesSent += recipients.length
  res.json({ message: 'Campaign sent', sentCount: recipients.length, campaign })
})

export default router
