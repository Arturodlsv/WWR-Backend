import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import UserServices from '../services/user.services'
import Jwt from 'jsonwebtoken'
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

  async getUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await this.userServices.getUser(email, password)
      const token = Jwt.sign(
        {
          id: user?.id
        },
        process.env.JWT_SECRET as string
      )
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' })
      res.status(200).json(user)
    } catch (e: Error | any) {
      res.status(500).json({
        message: e
      })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { name, email, password, bio, photoId, photoUrl } = req.body
      const { id } = req.params
      const user = await this.userServices.updateUser({
        id,
        name,
        email,
        password,
        biografy: bio,
        photoId,
        photoUrl
      })
      res.status(200).json(user)
    } catch (e: Error | any) {
      res.status(500).json({
        message: e.message
      })
    }
  }
}

export default UserControllers
