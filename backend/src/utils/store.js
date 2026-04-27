import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'

const now = () => new Date().toISOString()

const adminId = randomUUID()
const schoolId = randomUUID()

export const db = {
  users: [
    {
      id: adminId,
      fullName: 'SmartClass Admin',
      email: 'admin@smartclass.test',
      passwordHash: bcrypt.hashSync('Admin123!', 10),
      role: 'admin',
      schoolId,
      createdAt: now()
    }
  ],
  schools: [
    {
      id: schoolId,
      name: 'SmartClass Demo School',
      district: 'Kampala',
      createdAt: now()
    }
  ],
  contacts: [],
  campaigns: [],
  templates: [],
  messages: [],
  analytics: {
    totalContacts: 0,
    totalCampaigns: 0,
    totalMessagesSent: 0
  }
}
