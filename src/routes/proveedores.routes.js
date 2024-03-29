import { Router } from 'express'
import { getProveedores, getProveedor, postProveedores, putProveedores, deleteProveedores } from '../controllers/proveedores.controller.js'

const router = Router()

router.get('/proveedores', getProveedores)

router.get('/proveedor/:id', getProveedor)

router.post('/proveedores', postProveedores)

router.patch('/proveedores/:idProveedor', putProveedores)

router.delete('/proveedores/:id', deleteProveedores)

export default router