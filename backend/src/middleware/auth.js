import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'
import { db } from '../utils/store.js'

export function authRequired(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization token' })
  }

  const token = header.slice(7)
  try {
    const payload = jwt.verify(token, config.jwtSecret)
    const user = db.users.find((u) => u.id === payload.userId)
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
