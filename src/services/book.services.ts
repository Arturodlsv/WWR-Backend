import { PrismaClient } from '@prisma/client'
import { TBook } from '../types/book.types'
import CloudServices from './cloudinary.services'
const prisma = new PrismaClient()

class BookServices {
  async createBook(data: TBook) {
    let result
    const cloudServices = new CloudServices()
    if (data.file) {
      console.log("If if is working correctly")
      const welcoems = await cloudServices.uploadImage(data.file)
      console.log(welcoems)
      console.log("result should appear behind this")
      data.file = result
    }
    try {
      return data.file
      // result = await prisma.$transaction(async (tx) => {
      //   // Create the book inside of the transaction
      //   const book = await tx.books.create({
      //     data: {
      //       title: data.title,
      //       description: data.description,
      //       BooksImage: {
      //         create: {
      //           imageId: (data.file?.public_id as string) || '',
      //           imageUrl:
      //             (data.file?.secure_url as string) ||
      //             'https://avatarfiles.alphacoders.com/370/370222.png'
      //         }
      //       }
      //     },
      //     include: {
      //       BooksImage: true
      //     }
      //   })

      //   // Create a book associated with the user inside the same transaction
      //   const insertBookUser = await tx.bookUser.create({
      //     data: {
      //       userId: data.userId,
      //       bookId: book.id
      //     }
      //   })

      //   return { book, insertBookUser }
      // })
    } catch (error) {
      // Handle transaction error
      // console.error('Transaction error:', error)
      // throw error
    }
    return result
  }

  async updateBook(data: TBook) {
    try {
      const book = await prisma.bookUser.update({
        where: {
          bookId: data.bookId,
          userId: data.userId
        },
        data: {
          Book: {
            update: {
              title: data.title,
              description: data.description
            }
          }
        }
      })
      return book
    } catch (error) {
      console.error('Transaction error:', error)
      throw error
    }
  }

  async getBooksByUserId(userId: string) {
    try {
      const books = await prisma.bookUser.findMany({
        where: {
          userId
        },
        include: {
          Book: {
            include: {
              BooksImage: true
            }
          }
        }
      })
      return books
    } catch (error) {
      console.error('Transaction error:', error)
      throw error
    }
  }
  async getBookById(userId: string, bookId: string) {
    try {
      const book = await prisma.bookUser.findUnique({
        where: {
          bookId: bookId,
          userId: userId
        },
        include: {
          Book: {
            include: {
              BooksImage: true
            }
          }
        }
      })
      if (!book) {
        throw new Error('Book not found')
      }
      return book
    } catch (error) {
      console.error('Transaction error:', error)
      throw error
    }
  }
}

export default BookServices
