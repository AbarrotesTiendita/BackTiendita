import { Router } from 'express'
import { getProductos, getProducto,deleteProductos } from '../controllers/productos.contoller.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/productos/:id', getProducto)

router.delete('/productos/:id', deleteProductos)

export default router