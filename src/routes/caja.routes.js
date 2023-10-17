import { Router } from 'express'
import { postCompu, postCaja, getCajas, postEntrada, getTodoCajas } from '../controllers/caja.controller.js'

const router = Router()
router.post('/computadora', postCompu)

router.post('/caja', postCaja)

router.post('/entrada', postEntrada)

router.get('/caja', getCajas)

router.get('/todoCajas', getTodoCajas)

export default router