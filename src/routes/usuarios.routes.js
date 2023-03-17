import { Router } from 'express'
import { get, postUsuarios } from '../controllers/usuarios.controller.js'

const router = Router()

router.get('/usuarios', getUsuarios)

router.post('/usuarios', postUsuarios)

export default router