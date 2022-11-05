import express from 'express'
import {
  getFeedController,
  getNewsController,
  publishNews, updatePost,
} from '../../controllers/newsController/news.js'



const newsRouter = express()


newsRouter.get('/feed', getFeedController)
newsRouter.get('/', getNewsController)

newsRouter.post('/', publishNews)

newsRouter.put('/:id', updatePost)

export default newsRouter



