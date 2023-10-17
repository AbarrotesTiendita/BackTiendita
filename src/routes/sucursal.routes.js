import { Router } from 'express'
import { postSucursal } from '../controllers/sucursal.controller.js'
const router = Router()

router.post('/crearSucursal', postSucursal)

export default router