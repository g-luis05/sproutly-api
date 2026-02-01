import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

if (!process.env.POSTGRES_URL) {
  throw 'POSTGRES_URL is not defined'
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.POSTGRES_URL,
    })
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
