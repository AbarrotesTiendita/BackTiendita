import { Router } from 'express'
import { getActuales, postVentas, putVentas } from '../controllers/ventas.controller.js'

const router = Router()

router.get('/Actuales', getActuales)

router.post('/ventas', postVentas)

router.patch('/ventas/:idVenta', putVentas)

export default router