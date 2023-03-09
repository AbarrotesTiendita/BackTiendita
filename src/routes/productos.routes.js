import { Router } from 'express'
import { getProductos, getProducto, putProductos, deleteProductos } from '../controllers/productos.contoller.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/producto/:id', getProducto)

router.patch('/productos/:id', putProductos)

router.delete('/productos/:id', deleteProductos)

export default router