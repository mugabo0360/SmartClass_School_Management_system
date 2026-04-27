import { Router } from 'express'

const router = Router()

router.post('/whatsapp/status', (req, res) => {
  res.json({
    received: true,
    provider: 'whatsapp',
    payloadPreview: req.body || null,
    note: 'This endpoint is ready for Meta WhatsApp Cloud API webhook events.'
  })
})

export default router
