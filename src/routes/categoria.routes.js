import { Router } from 'express'
import { getCartegorias, postCategorias, deleteCategoria } from '../controllers/categorias.controller.js'

const router = Router()

router.get('/categorias', getCartegorias)

router.post('/categorias', postCategorias)

router.delete('/categoria/:id', deleteCategoria)

export default router