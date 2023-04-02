import { Router } from 'express'
import { getActuales, postVentas, putVentas, getVentas, getDias, getTotal, postDetalleVentas } from '../controllers/ventas.controller.js'

const router = Router()

router.get('/actuales', getActuales)

router.post('/ventas', postVentas)

router.post('/detalleVentas', postDetalleVentas)

router.patch('/ventas/:idVenta', putVentas)

router.get('/ventas', getVentas)

router.get('/dias', getDias)
  
router.get('/total', getTotal)

export default router  