import { Router } from 'express'
import { getProveedores, getProveedor, postProveedores } from '../controllers/proveedores.controller.js'

const router = Router()

router.get('/proveedores', getProveedores)

router.get('/proveedor/:id', getProveedor)

router.post('/proveedores', postProveedores)

export default router