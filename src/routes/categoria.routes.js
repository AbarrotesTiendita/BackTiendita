import { Router } from 'express'
import { getCartegorias, postCategorias } from '../controllers/categorias.controller.js'

const router = Router()

router.get('/categorias', getCartegorias)

router.post('/categorias', postCategorias)

export default router