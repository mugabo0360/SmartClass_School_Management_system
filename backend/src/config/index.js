import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'smartclass-dev-secret',
  aiMode: process.env.AI_MODE || 'free',
  aiFallbackMode: process.env.AI_FALLBACK_MODE || 'template',
  aiMaxRequestsPerMinute: Number(process.env.AI_MAX_REQUESTS_PER_MINUTE || 20),
  aiMaxRequestsPerDay: Number(process.env.AI_MAX_REQUESTS_PER_DAY || 500),
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS || 300)
}
