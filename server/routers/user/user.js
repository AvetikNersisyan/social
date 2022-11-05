import express from 'express'
import { getUser } from '../../controllers/userController/user.js'


const userRouter = express()


userRouter.get('/', getUser)


export default userRouter
