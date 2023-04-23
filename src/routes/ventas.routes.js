import { Router } from 'express'
import { getActuales, postVentas, putVentas, getVentas, getDias, getTotal, postDetalleVentas, getDVentas, getSVentas, getAllVentas } from '../controllers/ventas.controller.js'

const router = Router()

router.get('/actuales', getActuales)

router.post('/ventas', postVentas)

router.post('/detalleVentas', postDetalleVentas)

router.patch('/ventas/:idVenta', putVentas)

router.get('/ventas', getVentas)

router.get('/dias', getDias)
  
router.get('/total', getTotal)

router.get('/dventas', getDVentas)


router.get('/sventas', getSVentas)

router.get('/allventas', getAllVentas)

export default router  