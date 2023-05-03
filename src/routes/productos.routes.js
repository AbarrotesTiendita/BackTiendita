import { Router } from 'express'
import { getProductos, getProductoss, getProducto, getInvercion, getAprox, putProductos, deleteProductos, postProductos } from '../controllers/productos.contoller.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/productoss', getProductoss)

router.get('/producto/:id', getProducto)

router.get('/invercion', getInvercion)

router.get('/aproximadas', getAprox)

router.post('/productos', postProductos)

router.patch('/productos/:Codigo', putProductos)

router.delete('/productos/:Codigo', deleteProductos)

export default router