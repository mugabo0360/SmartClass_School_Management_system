import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from './config/index.js'
import authRoutes from './routes/auth.js'
import contactsRoutes from './routes/contacts.js'
import campaignsRoutes from './routes/campaigns.js'
import templatesRoutes from './routes/templates.js'
import analyticsRoutes from './routes/analytics.js'
import webhookRoutes from './routes/webhooks.js'
import { authRequired } from './middleware/auth.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    service: 'smartclass-backend',
    status: 'running',
    health: '/health',
    apiBase: '/api',
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'smartclass-backend', time: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/webhooks', webhookRoutes)
app.use('/api/contacts', authRequired, contactsRoutes)
app.use('/api/campaigns', authRequired, campaignsRoutes)
app.use('/api/templates', authRequired, templatesRoutes)
app.use('/api/analytics', authRequired, analyticsRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
