import { Router } from 'express'
import { getActuales, postVentas, putVentas, getVentas } from '../controllers/ventas.controller.js'

const router = Router()

router.get('/Actuales', getActuales)

router.post('/ventas', postVentas)

router.patch('/ventas/:idVenta', putVentas)

router.get('/ventas', getVentas)

export default router