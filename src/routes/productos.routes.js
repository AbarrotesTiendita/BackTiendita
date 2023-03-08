import { Router } from 'express'
import { getProductos, getProducto, putProductos, deleteProductos } from '../controllers/productos.contoller.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/productos/:Codigo', getProducto)

router.patch('/productos/:Codigo', putProductos)

router.delete('/productos/:Codigo', deleteProductos)

export default router