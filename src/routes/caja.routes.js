import { Router } from 'express'
import { getCajas, postEntrada, getTodoCajas } from '../controllers/caja.controller.js'

const router = Router()

router.post('/entrada', postEntrada)

router.get('/caja', getCajas)
router.get('/todoCajas', getTodoCajas)

export default router