import { Router } from 'express'
import { getCajas } from '../controllers/caja.controllers.js'

const router = Router()

router.get('/caja', getCajas)



export default router