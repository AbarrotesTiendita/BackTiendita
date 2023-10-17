import { Router } from 'express'
import { postCliente, getCliente, getClienteIN, postCredito, getcreditoCliente, putCredito, getCreditos, getCreditosPorCliente, getDatosCliente, putCliente, deleteCliente } from '../controllers/cliente.controller.js'

const router = Router()

router.get('/saldoPendiente', getCreditosPorCliente)

router.post('/cliente', postCliente)

router.get('/cliente/:idCliente', getCliente)

router.get('/datosCliente/:idCliente', getDatosCliente)

router.get('/clienteIN', getClienteIN)

router.get('/creditos/:idCliente', getCreditos)

router.post('/credito', postCredito)

router.get('/creditoCliente/:idCliente', getcreditoCliente)

router.patch('/credito/:idCliente/:idCredito', putCredito)

router.patch('/actCliente/:idCliente', putCliente)

router.delete('/deleteCliente/:idCliente', deleteCliente)

export default router