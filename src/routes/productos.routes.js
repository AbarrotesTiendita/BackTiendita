import { Router } from 'express'
import { getProductos, getProducto, putProductos, deleteProductos } from '../controllers/productos.contoller.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/productos/:id', getProducto)

router.put('/productos/:id', putProductos)

router.delete('/productos/:id', deleteProductos)

export default router