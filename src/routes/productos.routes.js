import { Router } from 'express'
import { getProductos, getProductoss, getProductosPaquete ,getProducto, getProductosPaqCodigo , getInvercion, getAprox, putProductos, deleteProductos, postProductos, getConsultarProducto } from '../controllers/productos.contoller.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/productosPaq', getProductosPaquete)

router.get('/productoss', getProductoss)

router.get('/producto/:id', getProducto)

router.get('/consultarProducto', getConsultarProducto)

router.get('/productosPaq/:Codigo_Producto', getProductosPaqCodigo)

router.get('/invercion', getInvercion)

router.get('/aproximadas', getAprox)

router.post('/productos', postProductos)

router.patch('/productos/:Codigo_Producto', putProductos)

router.delete('/productos/:Codigo_Producto', deleteProductos)

export default router