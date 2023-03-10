import { Router } from 'express'
import { getActuales } from '../controllers/ventas.controller.js'

const router = Router()

router.get('/Actuales', getActuales)

export default router