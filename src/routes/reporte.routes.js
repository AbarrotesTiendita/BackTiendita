import { Router } from 'express'
import {getGCategoria} from '../controllers/reporte.controller.js'
const router = Router()

router.get('/reporte', getGCategoria)

export default router