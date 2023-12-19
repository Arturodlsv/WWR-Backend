import { Router } from 'express'
import upload from '../services/multer.services'
import BookServices from '../services/book.services'
import BookControllers from '../controllers/book.controllers'
import AuthMiddleware from '../middlewares/auth.middleware'
const router = Router()
const bookServices = new BookServices()
const bookControllers = new BookControllers(bookServices)

router.post(
  '/create',
  AuthMiddleware,
  upload.single('file'),
  bookControllers.createBook.bind(bookControllers)
)

router.get(
  '/getAll',
  AuthMiddleware,
  bookControllers.getAllBooks.bind(bookControllers)
)

router.patch(
  '/update/:id',
  AuthMiddleware,
  bookControllers.updateBook.bind(bookControllers)
)
router.get(
  '/get/:id',
  AuthMiddleware,
  bookControllers.getBookById.bind(bookControllers)
)

export default router
