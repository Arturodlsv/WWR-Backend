import { PrismaClient } from '@prisma/client'
import { TUser } from '../types/user.types'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

class UserServices {
  insertUser = async (data: TUser) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
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

  getUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      include: {
        userProfile: {
          include: {
            ProfilePhoto: true
          }
        }
      }
    })
    if (!user) {
      return null
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return null
    }
    return user
  }

  updateUser = async (data: TUser) => {
    let updateData = <TUser>{}
    if (data.password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(data.password, salt)
      updateData = {
        ...updateData,
        password: hashedPassword
      }
    } else {
      updateData = data
    }
    const user = await prisma.user.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name,
        email: data.email,
        password: updateData.password,
        userProfile: {
          update: {
            bio: data.biografy,
            ProfilePhoto: {
              update: {
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
