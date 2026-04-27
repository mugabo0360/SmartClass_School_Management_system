import { Router } from 'express'
import { db } from '../utils/store.js'

const router = Router()

router.get('/overview', (req, res) => {
  const schoolContacts = db.contacts.filter((c) => c.schoolId === req.user.schoolId).length
  const schoolCampaigns = db.campaigns.filter((c) => c.schoolId === req.user.schoolId).length
  const schoolMessages = db.campaigns
    .filter((c) => c.schoolId === req.user.schoolId)
    .reduce((sum, c) => sum + (c.sentCount || 0), 0)

  res.json({
    schoolId: req.user.schoolId,
    totalContacts: schoolContacts,
    totalCampaigns: schoolCampaigns,
    totalMessagesSent: schoolMessages
  })
})

export default router
