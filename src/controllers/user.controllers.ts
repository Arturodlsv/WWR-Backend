import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
const prisma = new PrismaClient()

class UserControllers {
  async createUser(req: Request, res: Response) {
    const { name, email, password, biografy } = req.body
  }
}
