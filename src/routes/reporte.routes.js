import { Router } from 'express'
import { getGCategoria, getOperacion, getProductomax, getProductomen, getStock } from '../controllers/reporte.controller.js'

const router = Router()

router.get('/reporte', getGCategoria)

router.get('/operacion', getOperacion)

router.get('/masvendido', getProductomax)

router.get('/menvendido', getProductomen)

router.get('/stock', getStock)

export default router