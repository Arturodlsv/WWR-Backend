import { Request, Response } from 'express'
import BookServices from '../services/book.services'

class BookControllers {
  constructor(private bookServices: BookServices) {
    this.bookServices = bookServices
  }
  async createBook(req: Request | any, res: Response) {
    try {
      const { title, description } = req.body
      const { file } = req
      const { id } = req.userId
      const book = await this.bookServices.createBook({
        title,
        description,
        userId: id,
        file
      })
      res.status(201).json({ book })
    } catch (e: Error | any) {
      res.status(500).json(e.message)
    }
  }

  async updateBook(req: Request | any, res: Response) {
    try {
      const { id } = req.userId
      const { bookId } = req.params
      const { title, description } = req.body
      const book = await this.bookServices.updateBook({
        userId: id,
        bookId,
        title,
        description
      })
      res.status(200).json({ book })
    } catch (e: Error | any) {
      res.status(500).json(e.message)
    }
  }

  async getBookById(req: Request | any, res: Response) {
    try {
      const { id } = req.userId
      const { bookId } = req.params
      const book = await this.bookServices.getBookById(id, bookId)
      res.status(200).json({ book })
    } catch (e: Error | any) {
      res.status(500).json(e.message)
    }
  }
}

export default BookControllers
