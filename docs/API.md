# SmartClass Backend API

Base URL (local): `http://localhost:4000`

## Health
- `GET /health`

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

Register payload:
```json
{
  "fullName": "Joshua Mugabo",
  "email": "admin@school.ug",
  "password": "StrongPass123!",
  "role": "admin",
  "schoolName": "Kampala Junior School",
  "district": "Kampala"
}
```

Login payload:
```json
{
  "email": "admin@school.ug",
  "password": "StrongPass123!"
}
```

## Contacts (Auth required)
- `GET /api/contacts`
- `POST /api/contacts`

Create payload:
```json
{
  "name": "Parent One",
  "phone": "+256700000000",
  "email": "parent@example.com",
  "tags": ["pta", "fees-pending"]
}
```

## Campaigns (Auth required)
- `GET /api/campaigns`
- `POST /api/campaigns`
- `POST /api/campaigns/:id/send`

Create payload:
```json
{
  "name": "Term Opening Reminder",
  "message": "School opens Monday at 8am.",
  "audienceTag": "pta"
}
```

## Templates (Auth required)
- `GET /api/templates`
- `POST /api/templates`

## Analytics (Auth required)
- `GET /api/analytics/overview`

## Webhooks
- `POST /api/webhooks/whatsapp/status`

---

### Authentication
Protected endpoints require:
`Authorization: Bearer <token>`

