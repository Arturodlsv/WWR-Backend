import { Request, Response } from 'express'
import BookServices from '../services/book.services'

class BookControllers {
  constructor(private bookServices: BookServices) {
    this.bookServices = bookServices
  }
  async createBook(req: Request | any, res: Response) {
    try {
      const { title, description, imageId, imageUrl } = req.body
      const { id } = req.userId
      const book = await this.bookServices.createBook({
        title,
        description,
        userId: id,
        imageUrl,
        imageId
      })
      res.status(201).json({ book })
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default BookControllers
