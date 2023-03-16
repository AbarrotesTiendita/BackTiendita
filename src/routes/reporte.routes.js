import { Router } from 'express'
import { getGCategoria, getEntradas, getSalidas } from '../controllers/reporte.controller.js'

const router = Router()

router.get('/reporte', getGCategoria)

router.get('/entradas', getEntradas)

router.get('/salidas', getSalidas)

export default router