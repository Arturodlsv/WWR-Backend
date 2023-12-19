import { Router } from 'express'
import ChapterControllers from '../controllers/chapter.controllers'
import ChapterServices from '../services/chapter.services'
import AuthMiddleware from '../middlewares/auth.middleware'
const router = Router()
const chapterServices = new ChapterServices()
const chapterControllers = new ChapterControllers(chapterServices)

router.post(
  '/create',
  AuthMiddleware,
  chapterControllers.CreateChapter.bind(chapterControllers)
)

router.patch(
  '/update/:bookId/:chapterId',
  AuthMiddleware,
  chapterControllers.updateChapter.bind(chapterControllers)
)

router.get(
  '/getAll/:bookId',
  AuthMiddleware,
  chapterControllers.getAllChapters.bind(chapterControllers)
)

router.get(
  '/get/:bookId/:chapterId',
  AuthMiddleware,
  chapterControllers.getChapterById.bind(chapterControllers)
)

export default router
