import express from 'express'
import {
  getNewsController, publishNews,

} from '../controllers/newsController/news.js'
import { getUser } from '../controllers/userController/user.js'
import { verifyToken } from '../middlewares/verifyToken.js'


const router = express()

router.use(verifyToken)

router.get('/news', getNewsController)

router.post('/news', publishNews)
router.get('/user', getUser)

export default router
