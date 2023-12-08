import { Router } from 'express'
import upload from '../services/multer.services'
import UserControllers from '../controllers/user.controllers'
import UserServices from '../services/user.services'
const router = Router()
const userServices = new UserServices()
const userControllers = new UserControllers(userServices)

router.post(
  '/create',
  upload.single('file'),
  userControllers.createUser.bind(userControllers)
)

router.post('/login', userControllers.getUser.bind(userControllers))

export default router
