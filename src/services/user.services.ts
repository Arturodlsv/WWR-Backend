import { PrismaClient } from '@prisma/client'
import { TUser } from '../types/user.types'
import CloudServices from './cloudinary.services'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

class UserServices {
  insertUser = async (data: TUser) => {
    const cloudServices = new CloudServices()
    if (data.file) {
      const result = await cloudServices.uploadImage(data.file)
      data.file = result
    }
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
                photoId: (data.file?.public_id as string) || '',
                photoUrl:
                  (data.file?.secure_url as string) ||
                  'https://avatarfiles.alphacoders.com/370/370222.png'
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
      throw new Error('User not found')
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
                photoId: '',
                photoUrl: ''
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
