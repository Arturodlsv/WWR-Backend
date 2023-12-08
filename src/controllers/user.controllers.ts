import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import UserServices from '../services/user.services'
const prisma = new PrismaClient()

class UserControllers {
  constructor(private userServices: UserServices) {
    this.userServices = userServices
  }
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, bio, photoId, photoUrl } = req.body
      const user = await this.userServices.insertUser({
        name,
        email,
        password,
        biografy: bio,
        photoId,
        photoUrl
      })
      res.status(201).json(user)
    } catch (e: Error | any) {
      res.status(500).json(e.message)
    }
  }
}

export default UserControllers
