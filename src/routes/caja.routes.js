import { Router } from 'express'
import { postEntrada } from '../controllers/caja.controller.js'

const router = Router()

router.post('/entrada', postEntrada)

export default router