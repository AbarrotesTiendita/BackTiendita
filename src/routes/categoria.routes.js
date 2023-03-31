import { Router } from 'express'
import { getCartegorias, getCategoria, postCategorias, deleteCategoria } from '../controllers/categorias.controller.js'

const router = Router()

router.get('/categorias', getCartegorias)

router.get('/categoria/:id', getCategoria)

router.post('/categorias', postCategorias)

router.delete('/categoria/:id', deleteCategoria)

export default router