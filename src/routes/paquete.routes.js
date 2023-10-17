import { Router } from 'express'
import { getPaquetes, postPaquete, getPaquetesCN, postPaqueteProducto, deletePaquete, getVentaPaquete } from '../controllers/paquete.controller.js'

const router = Router()

router.get('/paquetes', getPaquetes)

router.get('/paquetesCN', getPaquetesCN)

router.get('/ventaPaquete/:idPaquete', getVentaPaquete)

router.post('/paquete', postPaquete)

router.post('/paqueteProducto', postPaqueteProducto)

router.delete('/paquete/:idPaquete', deletePaquete)


export default router