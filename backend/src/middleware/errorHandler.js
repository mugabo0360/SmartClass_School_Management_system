export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` })
}

export function errorHandler(error, req, res, next) {
  const status = error.status || 500
  const message = error.message || 'Unexpected server error'
  res.status(status).json({ error: message })
}
