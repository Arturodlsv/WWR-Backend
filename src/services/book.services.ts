import { PrismaClient } from '@prisma/client'
import { TBook } from '../types/book.types'
const prisma = new PrismaClient()

class BookServices {
  async createBook(data: TBook) {
    let result
    try {
      result = await prisma.$transaction(async (tx) => {
        // Create the book inside of the transaction
        const book = await tx.books.create({
          data: {
            title: data.title,
            description: data.description,
            BooksImage: {
              create: {
                imageId: data.imageUrl,
                imageUrl: data.imageUrl
              }
            }
          },
          include: {
            BooksImage: true
          }
        })

        // Create a book associated with the user inside the same transaction
        const insertBookUser = await tx.bookUser.create({
          data: {
            userId: data.userId,
            bookId: book.id
          }
        })

        return { book, insertBookUser }
      })
    } catch (error) {
      // Handle transaction error
      console.error('Transaction error:', error)
      throw error
    }
    return result
  }

  async upadteBook(data: TBook) {
    try {
      const book = await prisma.books.update({
        where: {
          id: data.id
        },
        data: {
          title: data.title,
          description: data.description
        }
      })
      return book
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
