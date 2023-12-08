import { PrismaClient } from '@prisma/client'
import { TUser } from '../types/user.types'
const prisma = new PrismaClient()

class UserServices {
  insertUser = async (data: TUser) => {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        userProfile: {
          create: {
            bio: data.biografy,
            ProfilePhoto: {
              create: {
                photoId: data.photoId,
                photoUrl: data.photoUrl
              }
            }
          }
        }
      },
      include: {
        userProfile: {
          include: {
            ProfilePhoto: true
          }
        }
      }
    })
    return user
  }
}

export default UserServices
