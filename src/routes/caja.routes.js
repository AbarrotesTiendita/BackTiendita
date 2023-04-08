import { Router } from 'express'
import { getCajas, postEntrada } from '../controllers/caja.controller.js'

const router = Router()

router.post('/entrada', postEntrada)

router.get('/caja', getCajas)

export default router