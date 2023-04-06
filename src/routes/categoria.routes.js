import { Router } from 'express'
import { getCategorias, getCategoria, getCategoriaa, postCategorias, deleteCategoria, putCategoriact } from '../controllers/categorias.controller.js'

const router = Router()

router.get('/categorias', getCategorias)

router.get('/categoria/:id', getCategoria)

router.get('/categoriass/:id', getCategoriaa)

router.patch('/categoriact/:idCategoria', putCategoriact)

router.post('/categorias', postCategorias)

router.delete('/categoria/:id', deleteCategoria)

export default router