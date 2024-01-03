import { Request, Response } from 'express'
import ChapterServices from '../services/chapter.services'

class ChapterControllers {
  constructor(private chapterServices: ChapterServices) {
    this.chapterServices = chapterServices
  }

  async CreateChapter(req: Request | any, res: Response) {
    try {
      const { title, content } = req.body
      const { id } = req.userId
      const { bookId } = req.params
      const chapter = await this.chapterServices.createChapter({
        title,
        content,
        userId: id,
        bookId
      })
      res.status(200).json({ chapter })
    } catch (e: Error | any) {
      res.status(500).json(e.message)
    }
  }

  async updateChapter(req: Request | any, res: Response) {
    try {
      const { title, content } = req.body
      const { id } = req.userId
      const { bookId, chapterId } = req.params
      const chapter = await this.chapterServices.updateChapter({
        title,
        content,
        userId: id,
        bookId,
        chapterId
      })
      res.status(200).json({ chapter })
    } catch (e: Error | any) {
      res.status(500).json(e.message)
    }
  }

  async getAllChapters(req: Request | any, res: Response) {
    try {
      const { id } = req.userId
      const { bookId } = req.params
      const chapters = await this.chapterServices.getChaptersByBookId(
        id,
        bookId
      )
      res.status(200).json({ chapters })
    } catch (e: Error | any) {
      res.status(500).json(e.message)
    }
  }
  async getChapterById(req: Request | any, res: Response) {
    try {
      const { id } = req.userId
      const { chapterId, bookId } = req.params
      const chapter = await this.chapterServices.getChapterById(
        id,
        bookId,
        chapterId
      )
      res.status(200).json({ chapter })
    } catch (e: Error | any) {
      res.status(500).json(e.message)
    }
  }
}

export default ChapterControllers
