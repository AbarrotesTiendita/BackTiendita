import { Router } from 'express'
import { getVendedores, deleteVendedores, putVendedores, postVendedores, getVendedor } from '../controllers/vendedores.controller.js'

const router = Router()

router.get('/vendedores', getVendedores)

router.get('/vendedores/:id', getVendedor)

router.post('/vendedores', postVendedores)

router.put('/vendedores/:id', putVendedores)

router.delete('/vendedores/:id', deleteVendedores)

export default router