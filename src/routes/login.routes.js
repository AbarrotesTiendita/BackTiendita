import { Router } from 'express'
import {postLogin, posts} from '../controllers/login.controller.js'

const router = Router()

router.post('/login', postLogin)

router.post('/posts', posts)

export default router