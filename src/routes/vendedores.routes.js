import { Router } from 'express'
import { getVendedores, deleteVendedores, putVendedores, putPermisos, postVendedores, getVendedor } from '../controllers/vendedores.controller.js'

const router = Router()

router.get('/vendedores', getVendedores)

router.get('/vendedor/:id', getVendedor)

router.post('/vendedores', postVendedores)

router.patch('/vendedores/:idVendedor', putVendedores)

router.patch('/permisos', putPermisos)

router.delete('/vendedores/:id', deleteVendedores)

export default router