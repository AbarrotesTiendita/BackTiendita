import { Router } from 'express'
import { getProveedores, getProveedor, postProveedores, putProveedores, deleteProveedor } from '../controllers/proveedores.controller.js'

const router = Router()

router.get('/proveedores', getProveedores)

router.get('/proveedor/:id', getProveedor)

router.post('/proveedores', postProveedores)

router.patch('/proveedores/:idProveedor', putProveedores)

router.delete('/proveedores/:id', deleteProveedor)

export default router