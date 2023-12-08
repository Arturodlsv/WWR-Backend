import { PrismaClient } from '@prisma/client'
import { TBook } from '../types/book.types'
import e from 'express'
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
}

export default BookServices
